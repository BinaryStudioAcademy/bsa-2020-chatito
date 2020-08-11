import { IUser } from '../user/IUser';

export interface IPost {
  user: Partial<IUser>;
  text: string;
  createdAt: Date;
}
