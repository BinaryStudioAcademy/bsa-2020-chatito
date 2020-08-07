import api from '../common/helpers/apiHelper';
import { IUser } from '../common/models/user/IUser';
import { ISignServerResponse } from '../common/models/auth/ISignServerResponse';
import { ISignUpFields } from '../common/models/auth/ISignUpFields';
import { ISignInFields } from '../common/models/auth/ISignInFIelds';

export const login = async (userInput: ISignInFields) => {
  const userData = {
    user: { ...userInput }
  };
  const response: ISignServerResponse & Response = await api.post('/api/auth/login', userData);

  return response.json();
};

export const registration = async (userInput: ISignUpFields): Promise<IUser> => {
  const userData = {
    user: { ...userInput }
  };
  const response: ISignServerResponse & Response = await api.post('/api/auth/register', userData);

  return response.json();
};

export const fetchUser = async (): Promise<IUser> => {
  const response: ISignServerResponse & Response = await api.get('/api/me/');

  return response.json();
};
