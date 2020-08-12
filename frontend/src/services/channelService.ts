// eslint-disable-next-line
import api from 'common/helpers/apiHelper';
import { ICreateChannel } from 'common/models/channel/ICreateChannel';
import { ICreatePost } from 'common/models/post/ICreatePost';

// eslint-disable-next-line
export async function createChannel(payload: ICreateChannel) {
  return new Promise(resolve => resolve(true));
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
