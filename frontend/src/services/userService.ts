import { IPost } from '../common/models/post/IPost';
import { IUserUnreadPostComments } from '../common/models/user/IUserUnreadPostComments';
import api from '../common/helpers/apiHelper';
import { IUser } from 'common/models/user/IUser';
import { IForgotPasswordInput } from 'common/models/auth/IForgotPasswordInput';
import { IEditStatusData } from 'common/models/status/IEditStatusData';
import { IUserUnreadPosts } from 'common/models/user/IUserUnreadPosts';

export const editStatus = async (editStatusData: IEditStatusData) => {
  const response: string[] = await api.put('/api/users/edit-status', editStatusData);
  return response[0];
};

export const deleteUser = async () => {
  await api.delete('/api/users');
};

export const editUser = async (data: Partial<IUser>) => {
  const response = await api.put<IUser>('/api/users', data);
  return response;
};

export const forgotPassword = async (forgotpassword: IForgotPasswordInput) => {
  await api.put('/api/auth/forgotpass', forgotpassword);
};

export const resetPassword = async (password: string, token: string) => {
  await api.put('/api/auth/resetpass', { password, token });
};

export const getUnreadPosts = async (wpId: string, id: string): Promise<IUserUnreadPosts> => {
  const response: IUserUnreadPosts = await api.get(`/api/workspaces/${wpId}/users/${id}/unread-posts`);
  return response;
};

export const getUnreadComments = async (wpId: string, userId: string): Promise<IUserUnreadPostComments> => {
  const response: IUserUnreadPostComments = await api.get(`/api/workspaces/${wpId}/users/${userId}/unread-comments`);
  return response;
};

export const deleteUnreadPosts = async (postIds: string[]): Promise<void> => {
  await api.post('/api/users/read-posts', { postIds });
};

export const deleteUnreadComments = async (commentIds: string[]): Promise<void> => {
  await api.post('/api/users/read-comments', { commentIds });
};

export const markPostAsUnread = async (postId: string): Promise<IPost> => {
  const post: IPost = await api.post('/api/users/unread-post', { postId });
  return post;
};

export const markCommentAsUnread = async (commentId: string): Promise<void> => {
  await api.post('/api/users/unread-comment', { commentId });
};

export const getUserById = async (id: string) => {
  const user: IUser = await api.get(`/api/users/${id}/basic`);
  return user;
};
