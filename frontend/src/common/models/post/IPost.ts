import { IUser } from '../user/IUser';

export interface IPost {
  id: string;
  user: IUser;
  text: string;
  createdAt: string;
}
