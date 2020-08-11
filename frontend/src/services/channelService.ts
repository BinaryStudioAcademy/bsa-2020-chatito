import api from 'common/helpers/apiHelper';
import { ICreateChannel } from 'common/models/channel/ICreateChannel';

export async function createChannel(payload: ICreateChannel) {
  const response = await api.post('/api/chats', payload);
  return response;
}

export async function fetchUserChannels() {
  const response = await api.get('/api/chats');
  return response;
}
