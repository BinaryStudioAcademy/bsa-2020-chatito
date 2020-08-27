import api from 'common/helpers/apiHelper';
import { IUser } from 'common/models/user/IUser';

export const addWorkspace = async (name: string) => {
  const response = await api.post('/api/workspaces', { name });
  return response;
};

export const getWorkspaceUsers = async (id: string): Promise<IUser[]> => {
  const response: IUser[] = await api.get(`/api/workspaces/${id}/users`);
  return response;
};
