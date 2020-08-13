import { IChatName } from './IThreadsChatName';
import { IUser } from 'common/models/user/IUser';
import { IFetchedPost } from '../post/IFetchedPost';

export interface IFetchedThreads {
  id: string;
  createdAt: string;
  text: string;
  chat: IChatName;
  createdByUser: IUser;
  comments: IFetchedPost[];
}