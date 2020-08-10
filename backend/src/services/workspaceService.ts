import { getCustomRepository } from 'typeorm';

import WorkspaceRepository from '../data/repositories/workspaceRepository';
import { ICreateWorkspace } from '../common/models/workspace/ICreateWorkspace';
import { IWorkspaceResponse } from '../common/models/workspace/IWorkspaceResponse';
import { fromCreatedWorkspaceToClient } from '../common/mappers/workspace';

export const createWorkspace = async (data: ICreateWorkspace): Promise<IWorkspaceResponse> => {
  const newWorkspace = await getCustomRepository(WorkspaceRepository).addWorkspace(data);

  return fromCreatedWorkspaceToClient(newWorkspace);
};
