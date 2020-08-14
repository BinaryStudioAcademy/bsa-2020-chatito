import { getCustomRepository } from 'typeorm';
import { ErrorCode } from '../common/enums/ErrorCode';

import WorkspaceRepository from '../data/repositories/workspaceRepository';
import UserRepository from '../data/repositories/userRepository';
import { IClientCreateWorkspace } from '../common/models/workspace/IClientCreateWorkspace';
import { IWorkspaceResponse } from '../common/models/workspace/IWorkspaceResponse';
import { fromCreatedWorkspaceToClient, fromClientCreateWorkspaceToCreateWorkspace } from '../common/mappers/workspace';
import { IUser } from '../common/models/user/IUser';
import CustomError from '../common/models/CustomError';

export const createWorkspace = async (data: IClientCreateWorkspace): Promise<IWorkspaceResponse> => {
  console.log('PLEASE');
  const { name } = data;
  console.log(data);

  console.log('isErr');
  const isWorkspaceExist = await getCustomRepository(WorkspaceRepository).findByName(name);
  console.log('isErr');
  if (isWorkspaceExist) {
    throw new CustomError(500,
      'This workspace is already exists! Please, choose the other name for your workspace.',
      ErrorCode.WorkspaceAlreadyExists);
  }
  console.log('isErr');

  const workspaceData = fromClientCreateWorkspaceToCreateWorkspace(data);
  const user = await getCustomRepository(UserRepository).getById(data.createdByUserId);
  console.log('isErr');
  const newWorkspace = await getCustomRepository(WorkspaceRepository).addWorkspace(workspaceData, user);
  console.log('isErr');
  return fromCreatedWorkspaceToClient(newWorkspace);
};

export const getWorkspaceUsers = async (id: string): Promise<IUser[]> => {
  const workspace = await getCustomRepository(WorkspaceRepository).getById(id);

  return workspace.users;
};
