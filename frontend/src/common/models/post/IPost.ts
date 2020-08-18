import { IUser } from '../user/IUser';
import { ICommentsInfo } from './ICommentsInfo';

export interface IPost {
  createdByUser: IUser;
  text: string;
  createdAt: Date;
  id: string;
  chatId?: string;
  commentsInfo: ICommentsInfo;
}
