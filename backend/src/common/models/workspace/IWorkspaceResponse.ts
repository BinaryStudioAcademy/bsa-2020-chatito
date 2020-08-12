import { IUser } from '../user/IUser';

export interface IWorkspaceResponse {
  id: string;
  name: string;
  hash: string;
  imageUrl: string;
  users: IUser[];
}
