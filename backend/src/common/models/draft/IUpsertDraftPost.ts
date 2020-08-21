import { User } from '../../../data/entities/User';
import { Chat } from '../../../data/entities/Chat';

export interface IUpsertDraftPost {
  id?: string;
  text: string;
  createdByUserId: string;
  chatId: string;
  createdByUser?: User;
  chat?: Chat;
}
