import api from 'common/helpers/apiHelper';
import { IAuthServerResponse } from 'common/models/auth/IAuthServerResponse';
import { IRegisterUser } from 'common/models/auth/IRegisterUser';
import { ILoginUser } from 'common/models/auth/ILoginUser';

type ServerResponse = IAuthServerResponse & Response;

export const login = async (userInput: ILoginUser) => {
  const response = await api.post<ServerResponse>('/api/auth/login', userInput);
  return response;
};

export const registration = async (userInput: IRegisterUser) => {
  const userData = {
    user: { ...userInput }
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
