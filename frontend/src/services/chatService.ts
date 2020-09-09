import api from 'common/helpers/apiHelper';
import { ICreateChat } from 'common/models/chat/ICreateChat';
import { ICreatePost } from 'common/models/post/ICreatePost';
import { IAddUsersToChat } from 'common/models/chat/IAddUsersToChat';
import { IFetchMorePosts } from 'common/models/post/IFetchMorePosts';
import { IFetchNavPost } from 'common/models/post/IFetchNavPost';
import { IBrowserChannel } from 'common/models/chat/IBrowserChannel';
import { IEditPost } from 'common/models/post/IEditPost';
import { IEditComment } from 'common/models/post/IEditComment';
import { IDeleteComment } from 'common/models/post/IDeleteComment';

export async function createChat(payload: ICreateChat) {
  const response = await api.post('/api/chats', payload);
  return response;
}

export async function fetchWorkspaceChats(workspaceId: string) {
  const response = await api.get(`/api/workspaces/${workspaceId}/chats`);
  return response;
}

export const fetchPublicChannelByHash = (hash: string) => (
  api.get(`/api/chats/public/${hash}`)
);

export async function fetchChatPosts({ chatId, from, count }: IFetchMorePosts) {
  const response = await api.get(`/api/chats/${chatId}/posts`, { from, count });
  return response;
}

export async function fetchNavigationPost({ chatId, postId }: IFetchNavPost) {
  const response = await api.get(`/api/chats/${chatId}/posts`, { from: 0, postId });
  return response;
}

export async function fetchChatUsers(chatId: string) {
  const response = await api.get(`/api/chats/${chatId}/users`);
  return response;
}

export async function removeUserFromChat(chatId: string, userId: string) {
  const response = await api.delete(`/api/chats/${chatId}/users/${userId}`);
  return response;
}

export async function addPost({ chatId, text }: ICreatePost) {
  const response = await api.post('/api/posts', { text, chatId });
  return response;
}

export async function editPost({ id, text }: IEditPost) {
  const response = await api.put(`/api/posts/${id}`, { text });
  return response;
}

export async function deletePost(id: string) {
  const response = await api.delete(`/api/posts/${id}`);
  return response;
}

export async function editComment({ chatId, id, text }: IEditComment) {
  const response = await api.put(`/api/posts/${chatId}/comments/${id}`, { text });
  return response;
}

export async function deleteComment({ chatId, id }: IDeleteComment) {
  const response = await api.delete(`/api/posts/${chatId}/comments/${id}`);
  return response;
}

export const addUsersToChat = (payload: IAddUsersToChat) => (
  api.post('/api/chats/invite-users', payload)
);

export const fetchBrowserChannels = (workspaceId: string): Promise<IBrowserChannel[]> => (
  api.get(`/api/workspaces/${workspaceId}/browser-channels`)
);

export async function setMuted(chatId: string, muteValue: boolean) {
  const response = await api.post(`/api/chats/${chatId}/mute`, { muteValue });
  return response;
}
