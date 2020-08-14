import { IUser } from '../user/IUser';

export interface IPost {
  createdByUser: IUser;
  text: string;
  createdAt: Date;
  id: string;
  chatId?: string;
}
