import { User } from '../../../data/entities/User';
import { Chat } from '../../../data/entities/Chat';
import { IIntegration } from '../integration/IIntegration';

export interface ICreatePost {
  chat?: Chat;
  chatId?: string;
  text: string;
  createdByUserId?: string;
  createdByUser?: User;
  integration: IIntegration;
}
