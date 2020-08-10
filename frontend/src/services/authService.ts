import api from 'common/helpers/apiHelper';
import { IUser } from 'common/models/user/IUser';
import { IAuthServerResponse } from 'common/models/auth/IAuthServerResponse';
import { IRegisterUser } from 'common/models/auth/IRegisterUser';
import { ILoginUser } from 'common/models/auth/ILoginUser';

type ServerResponse = IAuthServerResponse & Response;

export const login = async (userInput: ILoginUser) => {
  const userData = {
    user: { ...userInput }
  };
  const response = await api.post<ServerResponse>('/api/auth/login', userData);

  return response.json();
};

export const registration = async (userInput: IRegisterUser) => {
  const userData = {
    user: { ...userInput }
  };
  const response = await api.post('/api/auth/register', userData);

  return response;
};

export const fetchUser = async (): Promise<IUser> => {
  const response = await api.get<ServerResponse>('/api/me/');

  return response.json();
};
