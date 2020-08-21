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

export const fromDraftPostToDraftPostClientDraftPage = (draftPost: DraftPost): IDraftPostClient => {
  const { id, text, chat: { hash, name } } = draftPost;
  return {
    id,
    text,
    chat: {
      hash,
      name
    }
  };
};

export const fromDraftCommentToDraftCommentDraftPage = (draftComment: DraftComment): IDraftCommentClient => {
  const { id, text, postId, post: { chat: { hash, name } } } = draftComment;
  return {
    id,
    text,
    chat: {
      hash,
      name
    },
    postId
  };
};
