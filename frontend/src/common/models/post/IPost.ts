import { IUser } from '../user/IUser';

export interface IPost {
  user: IUser;
  text: string;
  createdAt: Date;
  id: string;
}
