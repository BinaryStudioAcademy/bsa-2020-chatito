import { IUserClient } from '../user/IUserClient';

export interface ICommentClient {
  id: string;
  createdAt: Date;
  text: string;
  postId: string;
  user: IUserClient
}
