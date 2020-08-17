import api from 'common/helpers/apiHelper';
import { ICreateChat } from 'common/models/chat/ICreateChat';
import { ICreatePost } from 'common/models/post/ICreatePost';

export async function createChat(payload: ICreateChat) {
  const response = await api.post('/api/chats', payload);
  return response;
}

export async function fetchUserChats() {
  const response = await api.get('/api/chats');
  return response;
}

export async function fetchChatPosts(chatId: string) {
  const response = await api.get(`/api/chats/${chatId}/posts`);
  return response;
}

export async function fetchChatUsers(chatId: string) {
  const response = await api.get(`/api/chats/${chatId}/users`);
  return response;
}

export async function removeUserFromChat(chatId: string, userId: string) {
  console.log(chatId, userId);
  const response = await api.delete(`/api/chats/${chatId}/users/${userId}`);
  return response;
}

export async function addPost({ chatId, text }: ICreatePost) {
  const response = await api.post('/api/posts', { text, chatId });
  return response;
}
