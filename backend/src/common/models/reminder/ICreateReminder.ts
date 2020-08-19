import { IChat } from '../chat/IChat';
import { IUser } from '../user/IUser';

export interface ICreateReminder {
  day: string;
  time: string;
  note?: string;
  createdByUser: IUser;
  chat: IChat;
}
