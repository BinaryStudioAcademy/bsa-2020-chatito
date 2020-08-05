import { createToken } from './tokenHelper';
import { IUser } from '../models/user/IUser';
import { IUserResponse } from '../models/user/IUserResponse';

export const signUpResponseMapper = (user: IUser): IUserResponse => ({
  ...user,
  token: createToken({ id: user.id })
});
