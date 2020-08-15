import { IUserClient } from '../user/IUserClient';
import { ICommentClient } from '../comment/ICommentClient';

export interface IPostClient {
  id: string;
  createdAt: Date;
  text: string;
  chatId: string;
  createdByUser: IUserClient;
  comments: Array<ICommentClient>;
}
