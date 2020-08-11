import { IWorkspaceResponse } from '../workspace/IWorkspaceResponse';

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  imageUrl?: string;
  title?: string;
  status?: string;
  workspaces: IWorkspaceResponse[];
}
