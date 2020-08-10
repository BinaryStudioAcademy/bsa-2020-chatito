import api from '@helpers/apiHelper';
import { IUser } from '@models/user/IUser';
import { IAuthServerResponse } from '@models/auth/IAuthServerResponse';
import { IRegisterUser } from '@models/auth/IRegisterUser';
import { ILoginUser } from '@models/auth/ILoginUser';

type ServerResponse = IAuthServerResponse & Response;

export const login = async (userInput: ILoginUser) => {
  const userData = {
    user: { ...userInput }
  };
  const response = await api.post<ServerResponse>('/api/auth/login', userData);

  return response.json();
};

export const registration = async (userInput: IRegisterUser): Promise<IUser> => {
  const userData = {
    user: { ...userInput }
  };
  const response = await api.post<ServerResponse>('/api/auth/register', userData);

  return response.json();
};

export const fetchUser = async (): Promise<IUser> => {
  const response = await api.get<ServerResponse>('/api/me/');

  return response.json();
};
