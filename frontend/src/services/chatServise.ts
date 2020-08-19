import api from 'common/helpers/apiHelper';
import { ICreateChat } from 'common/models/chat/ICreateChat';
import { ICreatePost } from 'common/models/post/ICreatePost';
import { IAddUsersToChat } from 'common/models/chat/IAddUsersToChat';

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
  const response = await api.get(`/api/chats/${channelId}/posts`);
  return response;
}

export async function addPost({ chatId, text }: ICreatePost) {
  const response = await api.post('/api/posts', { text, chatId });
  return response;
}

export const addUsersToChat = async (payload: IAddUsersToChat) => {
  await api.post('/api/chats/invite-users', payload);
};
