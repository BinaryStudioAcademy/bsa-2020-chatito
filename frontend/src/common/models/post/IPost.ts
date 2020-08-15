import { IUser } from '../user/IUser';
import { IComment } from './IComment';

export interface IPost {
  createdByUser: IUser;
  text: string;
  createdAt: Date;
  id: string;
  chatId?: string;
  comments: Array<IComment>;
}
