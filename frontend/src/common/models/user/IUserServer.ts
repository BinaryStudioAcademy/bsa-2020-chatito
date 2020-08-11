import { IWorkspace } from '../workspace/IWorkspace';

export interface IUserServer {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  imageUrl?: string | null;
  title?: string | null;
  workspaces: IWorkspace[];
}
