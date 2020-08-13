import { IUserClient } from './../user/IUserClient';

export interface IPostClient {
  id: string;
  createdAt: Date;
  text: string;
  chatId: string;
  user: IUserClient
}
