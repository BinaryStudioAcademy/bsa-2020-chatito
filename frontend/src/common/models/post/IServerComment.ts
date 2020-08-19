import { IUser } from '../user/IUser';
import { IPostReaction } from '../postReaction/IPostReaction';

export interface IServerComment {
  createdByUser: IUser;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  postReactions?: IPostReaction[];
  postId: string;
}
