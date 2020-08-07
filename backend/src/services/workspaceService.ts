import { getCustomRepository } from 'typeorm';

import WorkspaceRepository from '../data/repositories/workspaceRepository';
import { IClientCreateWorkspace } from '../common/models/workspace/IClientCreateWorkspace';
import { IWorkspaceResponse } from '../common/models/workspace/IWorkspaceResponse';
import { fromCreatedWorkspaceToClient, fromClientCreateWorkspaceToCreateWorkspace } from '../common/mappers/workspace';

export const createWorkspace = async (data: IClientCreateWorkspace): Promise<IWorkspaceResponse> => {
  const workspaceData = fromClientCreateWorkspaceToCreateWorkspace(data);

  const newWorkspace = await getCustomRepository(WorkspaceRepository).addWorkspace(workspaceData);

  return fromCreatedWorkspaceToClient(newWorkspace);
};
