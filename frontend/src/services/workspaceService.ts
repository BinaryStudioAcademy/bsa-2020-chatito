import api from '../common/helpers/apiHelper';

export const addWorkspace = async (name: string) => {
  const response = await api.post('/api/workspaces', { name });
  return response;
};

export const getWorkspaces = async () => {
  const response = await api.get('/api/workspaces');
  return response;
};
