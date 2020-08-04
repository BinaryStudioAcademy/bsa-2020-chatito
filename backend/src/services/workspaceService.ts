import { getCustomRepository } from 'typeorm';
import { WorkspaceRepository } from '../data/repositories/workspaceRepository';
import { ICreateWorkspace } from '../common/models/workspace';

export const createWorkspace = async (data: ICreateWorkspace) => {
  const newWorkspace = await getCustomRepository(WorkspaceRepository).addWorkspace(data);

  return newWorkspace;
};
