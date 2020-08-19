import { DraftPost } from '../../data/entities/DraftPost';
import { IDraftPostClient } from '../models/draft/IDraftPostClient';
import { DraftComment } from '../../data/entities/DraftComment';
import { IDraftCommentClient } from '../models/draft/IDraftCommentClient';

export const fromDraftPostToDraftPostClient = (draftPost: DraftPost): IDraftPostClient => {
  const { id, text } = draftPost;
  return {
    id,
    text
  };
};

export const fromDraftCommentToDraftCommentClient = (draftComment: DraftComment): IDraftCommentClient => {
  const { id, text } = draftComment;
  return {
    id,
    text
  };
};
