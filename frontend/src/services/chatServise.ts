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

export async function addPost({ chatId, text }: ICreatePost) {
  const response = await api.post('/api/posts', { text, chatId });
  return response;
}
