import api from 'common/helpers/apiHelper';
import { IAuthServerResponse } from 'common/models/auth/IAuthServerResponse';
import { IRegisterUser } from 'common/models/auth/IRegisterUser';
import { ILoginUser } from 'common/models/auth/ILoginUser';

type ServerResponse = IAuthServerResponse & Response;

export const login = async ({ email, password, workspace }: ILoginUser) => {
  const payload = {
    email,
    password,
    workspaceId: workspace.id
  };
  const response = await api.post<ServerResponse>('/api/auth/login', payload);
  return response;
};

export const registration = async ({ email, password, fullName, workspace }: IRegisterUser) => {
  const userData = {
    user: {
      email,
      password,
      fullName,
      workspaceId: workspace.id
    }
  };
  const response = await api.post('/api/auth/register', userData);

  return response;
};

export const fetchUser = async () => {
  const response = await api.get<ServerResponse>('/api/auth/me');

  return response;
};

export const removeToken = async (token: string | null) => {
  const response = await api.delete<ServerResponse>('/api/auth/tokens', { token });
  return response.json();
};
