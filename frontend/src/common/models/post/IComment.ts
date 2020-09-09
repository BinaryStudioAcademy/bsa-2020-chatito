import { IUser } from 'common/models/user/IUser';
import { IPost } from './IPost';

export interface IComment {
  createdAt: string;
  createdByUser: IUser
  createdByUserId: string;
  id: string;
  chatId: string;
  postId: string;
  text: string;
  updatedAt: string;
}
