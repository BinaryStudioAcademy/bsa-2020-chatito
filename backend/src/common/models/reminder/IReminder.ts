import { IChat } from '../chat/IChat';
import { IUser } from '../user/IUser';

export interface IReminder {
  id: string;
  date: Date;
  note?: string;
  createdByUser: IUser;
  chat: IChat;
}
