import { IUser } from '../user/IUser';
import { IPostReaction } from '../postReaction/IPostReaction';
import { ICommentsInfo } from './ICommentsInfo';
import { IDraftComment } from '../draft/IDraftComment';
import { MessageType } from 'common/enums/MessageType';
import { IntegrationType } from 'common/enums/IntegrationType';

export interface IPost {
  createdByUser: IUser;
  text: string;
  createdAt: Date;
  id: string;
  chatId?: string;
  postReactions: IPostReaction[];
  commentsInfo: ICommentsInfo;
  chat?: {
    name: string;
    hash?: string;
  }
  draftComments?: IDraftComment[];
  integration?: IntegrationType;
  type?: MessageType;
}
