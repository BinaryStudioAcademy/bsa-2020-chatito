import { getCustomRepository } from 'typeorm';
import { IUpsertDraftPost } from '../common/models/draft/IUpsertDraftPost';
import UserRepository from '../data/repositories/userRepository';
import ChatRepository from '../data/repositories/chatRepository';
import DraftPostRepository from '../data/repositories/draftPostRepository';
import {
  fromDraftPostToDraftPostClient,
  fromDraftCommentToDraftCommentClient,
  fromDraftPostToDraftPostClientDraftPage,
  fromDraftCommentToDraftCommentDraftPage
} from '../common/mappers/draft';
import CustomError from '../common/models/CustomError';
import { ErrorCode } from '../common/enums/ErrorCode';
import { IDeleteDraftPost } from '../common/models/draft/IDeleteDraftPost';
import PostRepository from '../data/repositories/postRepository';
import DraftCommentRepository from '../data/repositories/draftCommentRepository';
import { IUpsertDraftComment } from '../common/models/draft/IUpsertDraftComment';
import { IDeleteDraftComment } from '../common/models/draft/IDeleteDraftComment';
import { emitToChatRoom } from '../common/utils/socketHelper';
import { ClientSockets } from '../common/enums/ClientSockets';

export const upsertDraftPost = async (id: string, draftPost: IUpsertDraftPost) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  const chat = await getCustomRepository(ChatRepository).getById(draftPost.chatId);

  const newPost: IUpsertDraftPost = { ...draftPost, createdByUser: user, chat };

  let createdPost;
  try {
    createdPost = await getCustomRepository(DraftPostRepository).upsertDraftPost(newPost);
  } catch (error) {
    throw new CustomError(409, error, ErrorCode.DraftPostExists);
  }
  const mappedDraftPost = fromDraftPostToDraftPostClient(createdPost);

  emitToChatRoom(draftPost.chatId, ClientSockets.UpsertDraftPost, id, draftPost.chatId, mappedDraftPost);
  return mappedDraftPost;
};

export const deleteDraftPost = async (id: string, { chatId }: IDeleteDraftPost) => {
  const post = await getCustomRepository(DraftPostRepository).deleteDraftPost(id, chatId);
  if (post.id) {
    emitToChatRoom(chatId, ClientSockets.DeleteDraftPost, id, chatId, post);
    return { result: true };
  }
  return { result: false };
};

export const upsertDraftComment = async (id: string, draftComment: IUpsertDraftComment) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  const post = await getCustomRepository(PostRepository).getById(draftComment.postId);

  const newComment: IUpsertDraftComment = { ...draftComment, createdByUser: user, post };

  let createdComment;
  try {
    createdComment = await getCustomRepository(DraftCommentRepository).upsertDraftComment(newComment);
  } catch (error) {
    throw new CustomError(409, 'Draft comment exists. Should be unique for user-post.', ErrorCode.DraftCommentExists);
  }

  const chatId = (await getCustomRepository(PostRepository).getByIdWithChat(draftComment.postId)).chat.id;
  const mappedDraftComment = fromDraftCommentToDraftCommentClient(createdComment);

  emitToChatRoom(chatId, ClientSockets.UpsertDraftComment, id, chatId, draftComment.postId, mappedDraftComment);
  return mappedDraftComment;
};

export const deleteDraftComment = async (id: string, { postId }: IDeleteDraftComment) => {
  const chatId = (await getCustomRepository(PostRepository).getByIdWithChat(postId)).chat.id;
  await getCustomRepository(DraftCommentRepository).deleteDraftComment(id, postId);
  emitToChatRoom(chatId, ClientSockets.DeleteDraftComment, id, chatId, postId);
  return { result: true };
};

export const getAll = async (userId: string, wpId: string) => {
  const comments = await getCustomRepository(DraftCommentRepository).getByUserAndWorkspace(userId, wpId);
  const posts = await getCustomRepository(DraftPostRepository).getByUserAndWorkspace(userId, wpId);
  const clientPosts = await Promise.all(posts.map(async p => fromDraftPostToDraftPostClientDraftPage(p)));
  const clientComments = await Promise.all(comments.map(async c => fromDraftCommentToDraftCommentDraftPage(c)));
  return { comments: clientComments, posts: clientPosts };
};
