import { IUser } from '../models/user/IUser';
import { IUserClient } from '../models/user/IUserClient';
import { IRegisterUser } from '../models/user/IRegisterUser';
import { ICreateUser } from '../models/user/ICreateUser';

export const fromUserToUserClient = (user: IUser): IUserClient => {
  const { id, fullName, displayName, email, imageUrl, title } = user;

  return {
    id,
    fullName,
    email,
    displayName,
    imageUrl,
    title
  };
};

export const fromRegisterUserToCreateUser = (user: IRegisterUser): ICreateUser => ({
  ...user,
  displayName: user.fullName
});
