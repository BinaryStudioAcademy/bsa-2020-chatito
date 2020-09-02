import { IServerComment } from './IServerComment';

export interface IUnreadPostComments {
  id: string;
  unreadComments: IServerComment[];
}
