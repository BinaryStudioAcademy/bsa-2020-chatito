import { DraftPost } from '../../data/entities/DraftPost';
import { IDraftPostClient } from '../models/draft/IDraftPostClient';

export const fromDraftPostToDraftPostClient = (draftPost: DraftPost): IDraftPostClient => {
  const { id, text, createdByUserId, chatId } = draftPost;
  return {
    id,
    text,
    chatId,
    createdByUserId
  };
};
