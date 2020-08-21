import { IChat } from '../chat/IChat';
import { IUser } from '../user/IUser';

export interface ICreateReminder {
  date: Date;
  note?: string;
  createdByUser: IUser;
  chat: IChat;
}
