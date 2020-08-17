import { getCustomRepository } from 'typeorm';
import { IUpsertDraftPost } from '../common/models/draft/IUpsertDraftPost';
import UserRepository from '../data/repositories/userRepository';
import ChatRepository from '../data/repositories/chatRepository';
import DraftPostRepository from '../data/repositories/draftPostRepository';
import { fromDraftPostToDraftPostClient } from '../common/mappers/draft';
import CustomError from '../common/models/CustomError';
import { ErrorCode } from '../common/enums/ErrorCode';
import { IDeleteDraftPost } from '../common/models/draft/IDeleteDraftPost';

export const upsertDraftPost = async (id: string, draftPost: IUpsertDraftPost) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  const chat = await getCustomRepository(ChatRepository).getById(draftPost.chatId);

  const newPost: IUpsertDraftPost = { ...draftPost, createdByUser: user, chat };

  let createdPost;
  try {
    createdPost = await getCustomRepository(DraftPostRepository).upsertDraftPost(newPost);
  } catch (error) {
    throw new CustomError(409, 'Draft post exists.', ErrorCode.DraftPostExists);
  }

  return fromDraftPostToDraftPostClient(createdPost);
};

export const deleteDraftPost = async (id: string, { chatId }: IDeleteDraftPost) => {
  await getCustomRepository(DraftPostRepository).deleteDraftPost(id, chatId);
};
