import { getCustomRepository } from 'typeorm';

import WorkspaceRepository from '../data/repositories/workspaceRepository';
import UserRepository from '../data/repositories/userRepository';
import { IClientCreateWorkspace } from '../common/models/workspace/IClientCreateWorkspace';
import { IWorkspaceResponse } from '../common/models/workspace/IWorkspaceResponse';
import { fromCreatedWorkspaceToClient, fromClientCreateWorkspaceToCreateWorkspace } from '../common/mappers/workspace';
import { IUser } from '../common/models/user/IUser';

export const createWorkspace = async (data: IClientCreateWorkspace): Promise<IWorkspaceResponse> => {
  const workspaceData = fromClientCreateWorkspaceToCreateWorkspace(data);
  const user = await getCustomRepository(UserRepository).getById(data.createdByUserId);

  const newWorkspace = await getCustomRepository(WorkspaceRepository).addWorkspace(workspaceData, user);

  return fromCreatedWorkspaceToClient(newWorkspace);
};

export const getWorkspaceUsers = async (id: string): Promise<IUser[]> => {
  const workspace = await getCustomRepository(WorkspaceRepository).getById(id);

  return workspace.users;
};
