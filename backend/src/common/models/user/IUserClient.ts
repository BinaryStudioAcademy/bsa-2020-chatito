import { IWorkspaceResponse } from '../workspace/IWorkspaceResponse';

export interface IUserClient {
  id: string;
  fullName: string;
  email: string;
  displayName: string;
  imageUrl?: string;
  title?: string;
  workspaces: IWorkspaceResponse[];
}
