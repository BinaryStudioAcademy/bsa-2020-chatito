import { IWorkspaceResponse } from '../models/workspace/workspaceResponse';
import { Workspace } from '../../data/entities/Workspace';

export const fromCreatedWorkspaceToClient = (newWorkspace: Workspace): IWorkspaceResponse => {
  const { id: workspaceId, name, createdByUserId } = newWorkspace;

  return { workspaceId, name, createdByUserId };
};
