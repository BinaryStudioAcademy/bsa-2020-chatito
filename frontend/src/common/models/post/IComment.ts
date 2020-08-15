import { IUser } from '../user/IUser';

export interface IComment {
  user: IUser;
  text: string;
  createdAt: Date;
  id: string;
  postId?: string;
}
