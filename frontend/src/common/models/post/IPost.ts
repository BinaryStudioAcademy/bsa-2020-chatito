import { IUser } from '../user/IUser';
import { IPostReaction } from '../postReaction/IPostReaction';
import { ICommentsInfo } from './ICommentsInfo';
import { IDraftComment } from '../draft/IDraftComment';

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
}
