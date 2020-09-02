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

export const addPost = async (id: string, post: ICreatePost) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  const chat = await getCustomRepository(ChatRepository).getById(post.chatId);

  if (post.text.indexOf(ChatCommands.CreateWhaleMeeting) >= 0) {
    const whalePost = {
      createdByUserId: user.id,
      createdByUser: user,
      chatId: chat.id,
      chat,
      ...post
    };
    try {
      whalePost.text = (await createWhaleMeeting('slavakdudin2@gmail.com')).url;
      const createdPost: IPost = await getCustomRepository(PostRepository).addPost(whalePost);
      const clientPost = await fromPostToPostClient(createdPost);
      emitToChatRoom(clientPost.chatId, ClientSockets.AddPost, clientPost);

      return clientPost;
    } catch (err) {
      whalePost.text = `${err.response.data.text} <a href=${err.response.data.url} target="_blank">Sign up</a>`;
      const createdPost: IPost = {
        id: '1a111a1a-1111-1111-1a1a-1a11a1a1a111',
        postReactions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        ...whalePost
      };
      const clientPost = await fromPostToPostClient(createdPost);
      return clientPost;
    }
  }

  const newPost: ICreatePost = { ...post, createdByUser: user, chat };
  const createdPost: IPost = await getCustomRepository(PostRepository).addPost(newPost);
  const clientPost = await fromPostToPostClient(createdPost);
  emitToChatRoom(clientPost.chatId, ClientSockets.AddPost, clientPost);
  return clientPost;
};

export const editPost = async ({ id, text }: IEditPost) => {
  const editedPost: IPost = await getCustomRepository(PostRepository).editPost(id, text);
  const clientPost = await fromPostToPostClient(editedPost);
  emitToChatRoom(clientPost.chatId, ClientSockets.EditPost, clientPost);
  return clientPost;
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
  return newClientComment;
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
