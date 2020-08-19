import { IChat } from '../chat/IChat';
import { IUser } from '../user/IUser';

export interface IReminder {
  id: string;
  day: string;
  time: string;
  note?: string;
  createdByUser: IUser;
  chat: IChat;
}
