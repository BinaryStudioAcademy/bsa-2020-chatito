import { IUser } from '../user/IUser';

export interface IFetchedPost {
  id: string;
  createdByUser: IUser;
  text: string;
  createdAt: string;
}
