import { createToken } from './tokenHelper';
import { IUser } from '../models/user/IUser';
import { IUserResponse } from '../models/user/IUserResponse';
import { IRegisterUser } from '../models/user/IRegisterUser';
import { ICreateUser } from '../models/user/ICreateUser';

export const signUpResponseMapper = (user: IUser): IUserResponse => {
  const responseUser = user;
  delete responseUser.password;

  return {
    user: responseUser,
    token: createToken({ id: responseUser.id })
  };
};

export const createUserDataMapper = (user: IRegisterUser): ICreateUser => ({
  ...user,
  displayName: user.fullName
});
