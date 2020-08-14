import api from '../common/helpers/apiHelper';
import { ICreateComment } from 'common/models/post/ICreateComment';

export const getThreads = async () => {
  const response = await api.get('/threads');
  return response;
};

export const addComment = async ({ postId, text }: ICreateComment) => {
  const response = await api.post(`/api/posts/${postId}/comments`, { text });
  return response;
};

export const fetchPostComments = async (postId: string) => {
  const response = await api.get(`/api/posts/${postId}/comments`);
  return response;
};
