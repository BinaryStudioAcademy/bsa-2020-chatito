import { IServerComment } from './../post/IServerComment';

export interface IUserUnreadPostComments {
  id: string;
  unreadComments: IServerComment[];
}
