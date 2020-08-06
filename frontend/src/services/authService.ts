import api from '../common/helpers/apiHelper';
import { IUser } from '../common/models/user/user';
import { ISignServerResponse, ISignUpFields, ISignInFields } from '../common/models/auth/auth';

export const login = async (userInput: ISignInFields) => {
  const userData = {
    userData: JSON.stringify(userInput)
  };
  const response: ISignServerResponse & Response = await api.post('/api/auth/login', userData);

  return response.json();
};

export const registration = async (userInput: ISignUpFields): Promise<IUser> => {
  const userData = {
    userData: JSON.stringify(userInput)
  };
  const response: ISignServerResponse & Response = await api.post('/api/auth/register', userData);

  return response.json();
};
