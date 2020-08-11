import { IWorkspace } from 'common/models/workspace/IWorkspace';

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  imageUrl?: string;
  title?: string;
  status?: string;
  workspaces: IWorkspace[];
}
