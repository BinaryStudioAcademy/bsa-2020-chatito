import { User } from '../../../data/entities/User';
import { Chat } from '../../../data/entities/Chat';
import { IntegrationType } from '../../enums/IntegrationType';

export interface ICreatePost {
  chat?: Chat;
  chatId?: string;
  text: string;
  createdByUserId?: string;
  createdByUser?: User;
  integration?: IntegrationType;
}
