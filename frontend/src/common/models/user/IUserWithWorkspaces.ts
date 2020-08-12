import { IWorkspace } from 'common/models/workspace/IWorkspace';

export interface IUserWithWorkspaces {
  id: string;
  fullName: string;
  email: string;
  displayName: string;
  imageUrl: string;
  title: string;
  status: string;
  workspaces: IWorkspace[];
}
