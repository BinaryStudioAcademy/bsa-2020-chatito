import { IUserClient } from '../models/user/IUserClient';
import { IRegisterUser } from '../models/user/IRegisterUser';
import { ICreateUser } from '../models/user/ICreateUser';
import { User } from '../../data/entities/User';
import { IUserWithWorkspaces } from '../models/user/IUserWithWorkspaces';
import { fromCreatedWorkspaceToClient } from './workspace';

export const fromUserToUserClient = (user: IUserWithWorkspaces): IUserClient => {
  const { id, fullName, displayName, email, imageUrl, title, status } = user;

  return {
    id,
    fullName,
    email,
    displayName,
    imageUrl,
    title,
    status
  };
};

export const fromUserToUserWithWorkspaces = (user: User): IUserWithWorkspaces => {
  const { id, fullName, displayName, email, imageUrl, title, status, workspaces = [] } = user;
  return {
    id,
    fullName,
    email,
    displayName,
    imageUrl,
    title,
    status,
    workspaces: workspaces.map(workspace => fromCreatedWorkspaceToClient(workspace))
  };
};

export const fromRegisterUserToCreateUser = ({ fullName, email, password }: IRegisterUser): ICreateUser => ({
  fullName,
  email,
  password,
  displayName: fullName
});
