import { IUser } from '../user/IUser';

export interface IPost {
  id: string;
  user: Partial<IUser>;
  text: string;
  createdAt: Date;
}
