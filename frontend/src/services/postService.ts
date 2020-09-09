import api from 'common/helpers/apiHelper';
import { IPostReactionService } from 'common/models/postReaction/IPostReactionService';

export const addReaction = (payload: IPostReactionService) => (
  api.post('/api/post-reactions', payload)
);

export const deleteReaction = (payload: IPostReactionService) => (
  api.delete('/api/post-reactions', payload)
);

export const getById = async (postId: string) => {
  const response = await api.get(`/api/posts/${postId}`);
  return response;
};
