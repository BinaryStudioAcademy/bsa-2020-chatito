import { ICreateComment } from './../post/ICreateComment';

export interface IUnreadPost {
  id: string;
  unreadComments: ICreateComment[];
}
