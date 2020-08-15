import { IUser } from '../user/IUser';
import { IPostReaction } from '../postReaction/IPostReaction';

export interface IPost {
  createdByUser: IUser;
  text: string;
  createdAt: Date;
  id: string;
  chatId?: string;
  postReactions: IPostReaction[];
}
