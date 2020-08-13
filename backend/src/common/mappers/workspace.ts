import cryptoRandomString from 'crypto-random-string';

import { IWorkspaceResponse } from '../models/workspace/IWorkspaceResponse';
import { IClientCreateWorkspace } from '../models/workspace/IClientCreateWorkspace';
import { ICreateWorkspace } from '../models/workspace/ICreateWorkspace';
import { Workspace } from '../../data/entities/Workspace';

export const fromCreatedWorkspaceToClient = (newWorkspace: Workspace): IWorkspaceResponse => {
  const { id, name, hash, imageUrl, users } = newWorkspace;

  return { id, name, hash, imageUrl, users };
};

export const fromClientCreateWorkspaceToCreateWorkspace = (workspace: IClientCreateWorkspace): ICreateWorkspace => ({
  ...workspace,
  hash: cryptoRandomString({ length: 7, type: 'url-safe' }).toUpperCase()
});
