import api from 'common/helpers/apiHelper';
import { ICreateChat } from 'common/models/chat/ICreateChat';
import { ICreatePost } from 'common/models/post/ICreatePost';
import { IAddUsersToChat } from 'common/models/chat/IAddUsersToChat';
import { IFetchMorePosts } from 'common/models/post/IFetchMorePosts';

export async function createChat(payload: ICreateChat) {
  const response = await api.post('/api/chats', payload);
  return response;
}

export async function fetchWorkspaceChats(workspaceId: string) {
  const response = await api.get(`/api/workspaces/${workspaceId}/chats`);
  return response;
}

export async function fetchChatPosts({ chatId, from, count }: IFetchMorePosts) {
  const response = await api.get(`/api/chats/${chatId}/posts`, { from, count });
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

export const addUsersToChat = async (payload: IAddUsersToChat) => {
  await api.post('/api/chats/invite-users', payload);
};
