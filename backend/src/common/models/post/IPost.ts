import { IPostReaction } from '../postReaction/IPostReaction';
import { IChat } from '../chat/IChat';

export interface IPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: string;
  chatId: string;
  text: string;
  postReactions: IPostReaction[];
  chat?: IChat;
}
