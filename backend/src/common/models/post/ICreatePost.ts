import { User } from '../../../data/entities/User';
import { Chat } from '../../../data/entities/Chat';

export interface ICreatePost {
  chat?: Chat;
  chatId?: string;
  text: string;
  createdByUserId?: string;
  createdByUser?: User;
}
