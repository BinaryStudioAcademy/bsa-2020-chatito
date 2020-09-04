import { IWorkspaceResponse } from '../workspace/IWorkspaceResponse';
import { IncomingSoundOptions } from '../../enums/IncomingSoundOptions';

export interface IUserWithWorkspaces {
  id: string;
  fullName: string;
  email: string;
  displayName: string;
  imageUrl: string;
  title: string;
  status: string;
  githubUsername: string;
  workspaces: IWorkspaceResponse[];
  audio?: string;
  incomingSoundOptions: IncomingSoundOptions;
}
