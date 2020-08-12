import api from 'common/helpers/apiHelper';
import { ICreateDirect } from 'common/models/direct/ICreateDirect';

export async function createDirect(payload: ICreateDirect) {
  const response = await api.post('/api/chats', payload);
  return response;
}

export async function fetchUserDirects() {
  const response = await api.get('/api/chats');
  return response;
}
