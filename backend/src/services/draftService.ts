import { getCustomRepository } from 'typeorm';
import { IUpsertDraftPost } from '../common/models/draft/IUpsertDraftPost';
import UserRepository from '../data/repositories/userRepository';
import ChatRepository from '../data/repositories/chatRepository';
import DraftPostRepository from '../data/repositories/draftPostRepository';
import { fromDraftPostToDraftPostClient, fromDraftCommentToDraftCommentClient } from '../common/mappers/draft';
import CustomError from '../common/models/CustomError';
import { ErrorCode } from '../common/enums/ErrorCode';
import { IDeleteDraftPost } from '../common/models/draft/IDeleteDraftPost';
import PostRepository from '../data/repositories/postRepository';
import DraftCommentRepository from '../data/repositories/draftCommentRepository';
import { IUpsertDraftComment } from '../common/models/draft/IUpsertDraftComment';
import { IDeleteDraftComment } from '../common/models/draft/IDeleteDraftComment';

export const upsertDraftPost = async (id: string, draftPost: IUpsertDraftPost) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  const chat = await getCustomRepository(ChatRepository).getById(draftPost.chatId);

  const newPost: IUpsertDraftPost = { ...draftPost, createdByUser: user, chat };

  let createdPost;
  try {
    createdPost = await getCustomRepository(DraftPostRepository).upsertDraftPost(newPost);
  } catch (error) {
    throw new CustomError(409, 'Draft post exists. Should be unique for user-chat.', ErrorCode.DraftPostExists);
  }

  return fromDraftPostToDraftPostClient(createdPost);
};

export const deleteDraftPost = async (id: string, { chatId }: IDeleteDraftPost) => {
  await getCustomRepository(DraftPostRepository).deleteDraftPost(id, chatId);
  return { result: true };
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

  return fromDraftCommentToDraftCommentClient(createdComment);
};

export const deleteDraftComment = async (id: string, { postId }: IDeleteDraftComment) => {
  await getCustomRepository(DraftCommentRepository).deleteDraftComment(id, postId);
  return { result: true };
};
