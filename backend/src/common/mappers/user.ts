import { IUserClient } from '../models/user/IUserClient';
import { IRegisterUser } from '../models/user/IRegisterUser';
import { ICreateUser } from '../models/user/ICreateUser';
import { User } from '../../data/entities/User';
import { fromCreatedWorkspaceToClient } from './workspace';

export const fromUserToUserClient = (user: User): IUserClient => {
  const { id, fullName, displayName, email, imageUrl, title, workspaces } = user;

  return {
    id,
    fullName,
    email,
    displayName,
    imageUrl,
    title,
    workspaces: workspaces.map(workspace => fromCreatedWorkspaceToClient(workspace))
  };
};

export const fromRegisterUserToCreateUser = (user: IRegisterUser): ICreateUser => ({
  ...user,
  displayName: user.fullName
});
