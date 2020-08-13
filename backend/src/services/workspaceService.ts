import { ErrorCode } from '../common/enums/ErrorCode';
import { getCustomRepository } from 'typeorm';

import WorkspaceRepository from '../data/repositories/workspaceRepository';
import UserRepository from '../data/repositories/userRepository';
import { IClientCreateWorkspace } from '../common/models/workspace/IClientCreateWorkspace';
import { IWorkspaceResponse } from '../common/models/workspace/IWorkspaceResponse';
import { fromCreatedWorkspaceToClient, fromClientCreateWorkspaceToCreateWorkspace } from '../common/mappers/workspace';
import { IUser } from '../common/models/user/IUser';
import CustomError from '../common/models/CustomError';

export const createWorkspace = async (data: IClientCreateWorkspace): Promise<IWorkspaceResponse> => {
  try {
    const { name } = data;
    const isWorkspaceExist = await getCustomRepository(WorkspaceRepository).findByName(name);
    if (isWorkspaceExist) {
      throw new Error('This workspace name is already exists');
    }
  } catch (err) {
    throw new CustomError(500, 'This workspace is already exists! Please, choose the other name for your workspace.', ErrorCode.WorkspaceAlreadyExists, err);
  }
  const workspaceData = fromClientCreateWorkspaceToCreateWorkspace(data);
  const user = await getCustomRepository(UserRepository).getById(data.createdByUserId);

  const newWorkspace = await getCustomRepository(WorkspaceRepository).addWorkspace(workspaceData, user);

  return fromCreatedWorkspaceToClient(newWorkspace);
};

export const getWorkspaceUsers = async (id: string): Promise<IUser[]> => {
  const workspace = await getCustomRepository(WorkspaceRepository).getById(id);

  return workspace.users;
};
