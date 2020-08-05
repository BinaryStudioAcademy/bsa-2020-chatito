import { createToken } from '../utils/tokenHelper';
import { IUser } from '../models/user/IUser';
import { IUserResponse } from '../models/user/IUserResponse';
import { IRegisterUser } from '../models/user/IRegisterUser';
import { ICreateUser } from '../models/user/ICreateUser';

export const signUpResponseMapper = (user: IUser): IUserResponse => {
  const { id, fullName, displayName, email, imageUrl, title } = user;

  return {
    user: {
      id,
      fullName,
      email,
      displayName,
      imageUrl,
      title
    },
    token: createToken({ id })
  };
};

export const createUserDataMapper = (user: IRegisterUser): ICreateUser => ({
  ...user,
  displayName: user.fullName
});
