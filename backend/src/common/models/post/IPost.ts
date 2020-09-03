import { IPostReaction } from '../postReaction/IPostReaction';
import { IChat } from '../chat/IChat';
import { IUser } from '../user/IUser';
import { ClientPostType } from '../../enums/ClientPostType';
import { IntegrationType } from '../../enums/IntegrationType';

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
  integration?: IntegrationType;
  type?: ClientPostType
}
