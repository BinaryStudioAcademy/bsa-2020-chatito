import { User } from '../../../data/entities/User';

export interface ICreatePost {
  chatId: string;
  text: string;
  createdByUserId?: string;
  createdByUser?: User;
}
