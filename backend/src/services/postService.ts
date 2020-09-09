import { getCustomRepository } from 'typeorm';
import PostRepository from '../data/repositories/postRepository';
import UserRepository from '../data/repositories/userRepository';
import PostReactionRepository from '../data/repositories/postReactionRepository';
import { ICreatePost } from '../common/models/post/ICreatePost';
import { IEditPost } from '../common/models/post/IEditPost';
import { IPost } from '../common/models/post/IPost';
import { createWhaleMeeting } from './integrationService';
import { ICreateComment } from '../common/models/comment/ICreateComment';
import ChatRepository from '../data/repositories/chatRepository';
import { fromPostToPostClient } from '../common/mappers/post';
import CommentRepository from '../data/repositories/commentRepository';
import { fromPostCommentsToPostCommentsClient } from '../common/mappers/comment';
import { emitToChatRoom } from '../common/utils/socketHelper';
import { ClientSockets } from '../common/enums/ClientSockets';
import { fromUserToUserClient } from '../common/mappers/user';
import { ChatCommands } from '../common/enums/ChatCommands';
import CustomError from '../common/models/CustomError';
import { ClientPostType } from '../common/enums/ClientPostType';
import { IntegrationType } from '../common/enums/IntegrationType';
import { Comment } from '../data/entities/Comment';

export const addPost = async (id: string, post: ICreatePost) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  const chat = await getCustomRepository(ChatRepository).getById(post.chatId);

  if (post.text.indexOf(ChatCommands.CreateWhaleMeeting) >= 0) {
    const whalePost = {
      createdByUserId: user.id,
      createdByUser: user,
      chatId: chat.id,
      chat,
      integration: IntegrationType.Whale,
      ...post
    };
    try {
      whalePost.text = (await createWhaleMeeting(user.email)).url;
      const createdPost: IPost = await getCustomRepository(PostRepository).addPost(whalePost);
      const clientPost = await fromPostToPostClient({ ...createdPost, type: ClientPostType.WhaleJoinMeetingLink });
      emitToChatRoom(clientPost.chatId, ClientSockets.AddPost, clientPost);

      return clientPost;
    } catch (err) {
      if (err.response.status === 401) {
        whalePost.text = `
          ${err.response.data.text}
          <a href=${err.response.data.url} rel="noopener noreferrer" target="_blank">Sign up</a>
        `;
        const createdPost: IPost = {
          id: '1a111a1a-1111-1111-1a1a-1a11a1a1a111',
          postReactions: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          ...whalePost
        };
        const clientPost = await fromPostToPostClient({ ...createdPost, type: ClientPostType.WhaleSignUpUser });
        return clientPost;
      }
      throw new CustomError(err.status, 'Cannot create meeting. Please, try again later.');
    }
  }

  const newPost: ICreatePost = { ...post, createdByUser: user, chat };
  const createdPost: IPost = await getCustomRepository(PostRepository).addPost(newPost);
  const clientPost = await fromPostToPostClient({ ...createdPost, type: ClientPostType.CommonPost });
  emitToChatRoom(clientPost.chatId, ClientSockets.AddPost, clientPost, user.audio);
  const users = await getCustomRepository(ChatRepository).getAllChatUsers(chat.id);
  users.forEach(async chatUser => {
    if (user.id !== chatUser.id) {
      await getCustomRepository(UserRepository).markAsUnreadPost(chatUser.id, createdPost.id);
    }
  });
  emitToChatRoom(createdPost.chatId, ClientSockets.NotifyAndMarkAsUnread, createdPost, user, chat);
  return createdPost;
};

export const addPostByBotIntoDirect = async (id: string, post: ICreatePost) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  const chat = await getCustomRepository(ChatRepository).getById(post.chatId);
  const newPost: ICreatePost = { ...post, createdByUser: user, chat };
  const createdPost: IPost = await getCustomRepository(PostRepository).addPost(newPost);
  const clientPost = await fromPostToPostClient(createdPost);
  emitToChatRoom(clientPost.chatId, ClientSockets.AddPost, clientPost, user.audio);
  const users = await getCustomRepository(ChatRepository).getAllChatUsers(chat.id);
  users.forEach(async chatUser => {
    await getCustomRepository(UserRepository).markAsUnreadPost(chatUser.id, createdPost.id);
  });
  emitToChatRoom(createdPost.chatId, ClientSockets.NotifyAndMarkAsUnread, createdPost, { id: 0 }, chat);
  return createdPost;
};

export const editPost = async (id: string, { text }: IEditPost) => {
  const editedPost: IPost = await getCustomRepository(PostRepository).editPost(id, text);
  const clientPost = await fromPostToPostClient(editedPost);
  emitToChatRoom(clientPost.chatId, ClientSockets.EditPost, clientPost);

  return clientPost;
};

export const deletePost = async (id: string): Promise<unknown> => {
  const deletedPost: IPost = await getCustomRepository(PostRepository).deletePost(id);
  emitToChatRoom(deletedPost.chatId, ClientSockets.DeletePost, deletedPost);

  return {};
};

export const addComment = async (userId: string, postId: string, { text }: { text: string }) => {
  const createComment: ICreateComment = {
    post: { id: postId },
    text,
    createdByUser: { id: userId }
  };
  const comment = await getCustomRepository(CommentRepository).addComment(createComment);
  const newComment = await getCustomRepository(CommentRepository).getById(comment.id);
  const user = fromUserToUserClient(newComment.createdByUser);
  const newClientComment = { ...newComment, createdByUser: user };
  const chatId = (await getCustomRepository(PostRepository).getByIdWithChat(newClientComment.postId)).chat.id;
  emitToChatRoom(chatId, ClientSockets.AddReply, newClientComment);
  const postComments = await getCustomRepository(CommentRepository).getAllPostComments(postId);
  const postCreatedByUserId = (await getCustomRepository(PostRepository).getById(postId)).createdByUserId;
  let threadParticipantsId: string[] = [postCreatedByUserId];
  postComments.forEach(postComment => {
    threadParticipantsId.push(postComment.createdByUser.id);
  });
  threadParticipantsId = Array.from(new Set(threadParticipantsId));
  threadParticipantsId.forEach(async participantId => {
    if (user.id !== participantId) {
      await getCustomRepository(UserRepository).markAsUnreadComment(participantId, newClientComment.id);
    }
  });
  emitToChatRoom(chatId, ClientSockets.MarkAsUnreadComment, postId, newClientComment, threadParticipantsId);
  return newClientComment;
};

export const editComment = async (id: string, { text }: IEditPost) => {
  const editedComment: Comment = await getCustomRepository(CommentRepository).editComment(id, text);
  const clientComment = fromPostCommentsToPostCommentsClient([editedComment])[0];
  emitToChatRoom(clientComment.chatId, ClientSockets.EditComment, clientComment);

  return clientComment;
};

export const deleteComment = async (id: string): Promise<unknown> => {
  const deletedComment = await getCustomRepository(CommentRepository).deleteComment(id);
  const clientComment = fromPostCommentsToPostCommentsClient([deletedComment])[0];
  emitToChatRoom(clientComment.chatId, ClientSockets.DeleteComment, clientComment);

  return {};
};

export const getPostComments = async (postId: string) => {
  const comments = await getCustomRepository(CommentRepository).getAllPostComments(postId);
  return fromPostCommentsToPostCommentsClient(comments);
};

export const addReaction = async (reaction: string, postId: string, userId: string) => {
  const newReaction = await getCustomRepository(PostReactionRepository).addReaction({
    reaction,
    post: { id: postId },
    user: { id: userId }
  });
  const post = await getCustomRepository(PostRepository).getById(postId);
  emitToChatRoom(post.chatId, ClientSockets.AddReaction, { reaction, userId, postId });
  return newReaction;
};

export const deleteReaction = async (reaction: string, postId: string, userId: string) => {
  const deletedReaction = await getCustomRepository(PostReactionRepository).deleteReaction({
    reaction,
    postId,
    userId
  });
  const post = await getCustomRepository(PostRepository).getById(postId);
  emitToChatRoom(post.chatId, ClientSockets.DeleteReaction, { reaction, userId, postId });
  return deletedReaction;
};

export const test = async (postId: string) => {
  const post = await getCustomRepository(CommentRepository).getAllPostComments(postId);
  return post;
};

export const getPost = async (postId: string) => {
  const post = await getCustomRepository(PostRepository).getById(postId);
  const mappedPost = await fromPostToPostClient(post);
  return mappedPost;
};
