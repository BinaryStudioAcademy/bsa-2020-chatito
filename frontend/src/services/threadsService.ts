import api from '../common/helpers/apiHelper';

export async function getThreads() {
  const response = await api.get('/threads');
  return response;
}
