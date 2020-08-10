import { IUser } from '../user';

export interface IPost {
  id: string;
  chatId: string;
  createdByUser: IUser;
  createdByUserId: string;
  text: string;
  createdAt: string;
  updatedAt: string | undefined;
}
