// eslint-disable-next-line
import api from 'common/helpers/apiHelper';
import { ICreateChannel } from 'common/models/channel/ICreateChannel';
import { ICreatePost } from 'common/models/post/ICreatePost';

// eslint-disable-next-line
export async function createChannel(payload: ICreateChannel) {
  // const response = await api.post('/', payload);
  // return response;
  return new Promise(resolve => resolve(true));
}

export async function fetchUserChannels() {
  // const response = await api.get('/');
  // return response;
  return new Promise(resolve => resolve(true));
}

export async function fetchCnannelPosts(channelId: string) {
  // const response = await api.get('/');
  // return response;
  return new Promise(resolve => resolve(true));
}

export async function addPost({ chatId, text }: ICreatePost) {
  // const response = await api.get('/');
  // return response;

  return new Promise(resolve => resolve(true));
}
