import { IPostReaction } from '../postReaction/IPostReaction';

export interface IPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: string;
  chatId: string;
  text: string;
  postReactions: IPostReaction[];
}
