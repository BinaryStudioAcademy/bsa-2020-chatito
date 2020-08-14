import api from '../common/helpers/apiHelper';
import { ICreateComment } from 'common/models/post/ICreateComment';
import { IPostsForThreads } from 'common/models/post/IPostsForThreads';

export const getThreads = async ({ userId, activeWorkspaceId }: IPostsForThreads) => {
  const response = await api.get(`/api/workspaces/${activeWorkspaceId}/users/${userId}/posts`);
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
