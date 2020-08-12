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

export async function fetchUserChannels() {
  const response = await api.get('/api/chats');
  return response;
}

export async function fetchCnannelPosts(channelId: string) {
  const response = await api.post(`/api/chats/${channelId}/posts`);
  return response;
}

export async function addPost({ chatId, text }: ICreatePost) {
  const response = await api.post(`/api/chats/${chatId}/posts`, { text });
  return response;
}
