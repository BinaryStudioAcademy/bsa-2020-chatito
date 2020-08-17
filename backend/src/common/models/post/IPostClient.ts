import { IUserClient } from '../user/IUserClient';
import { ICommentsInfo } from './ICommentsInfo';

export interface IPostClient {
  id: string;
  createdAt: Date;
  text: string;
  chatId: string;
  createdByUser: IUserClient;
  commentsInfo: ICommentsInfo
}
