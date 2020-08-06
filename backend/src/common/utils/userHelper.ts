import { createToken } from './tokenHelper';
import { IUser, IUserResponse } from '../models/user';

export const signUpResponseMapper = (user: IUser): IUserResponse => ({
  ...user,
  token: createToken({ id: user.id })
});
