import { IFetchedChat } from './IThreadsChatName';
import { IUser } from 'common/models/user/IUser';
import { IPost } from '../post/IPost';
import { IComment } from '../post/IComment';

export interface IFetchedThreads {
  id: string;
  createdAt: string;
  text: string;
  chat: IFetchedChat;
  createdByUser: IUser;
  comments: Array<IComment>;
}
