import { IFetchedChat } from './IThreadsChatName';
import { IUser } from 'common/models/user/IUser';
import { IPost } from '../post/IPost';
import { IPostReaction } from '../postReaction/IPostReaction';
import { IntegrationType } from 'common/enums/IntegrationType';

export interface IFetchedThreads {
  id: string;
  createdAt: string;
  text: string;
  chat: IFetchedChat;
  createdByUser: IUser;
  comments: IPost[];
  postReactions: IPostReaction[];
  integration: IntegrationType;
}
