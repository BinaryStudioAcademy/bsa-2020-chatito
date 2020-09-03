import { IPostReaction } from '../postReaction/IPostReaction';
import { IChat } from '../chat/IChat';
import { IUser } from '../user/IUser';
import { IIntegration } from '../integration/IIntegration';
import { ClientPostType } from '../../enums/ClientPostType';

export interface IPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: string;
  chatId: string;
  text: string;
  postReactions: IPostReaction[];
  chat?: IChat;
  createdByUser?: IUser;
  integration?: IIntegration;
  type?: ClientPostType
}
