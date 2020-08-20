import { IUserClient } from '../user/IUserClient';
import { IPostReactionClient } from '../postReaction/IPostReactionClient';
import { ICommentsInfo } from './ICommentsInfo';

export interface IPostClient {
  id: string;
  createdAt: Date;
  text: string;
  chatId: string;
  createdByUser: IUserClient;
  postReactions: IPostReactionClient[];
  commentsInfo: ICommentsInfo;
  chat?: {
    name: string;
    hash: string;
  }
}
