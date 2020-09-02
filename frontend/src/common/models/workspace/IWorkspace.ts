import { IUser } from 'common/models/user/IUser';

export interface IWorkspace {
  id: string;
  name: string;
  hash: string;
  imageUrl: string;
  users: IUser[];
}
