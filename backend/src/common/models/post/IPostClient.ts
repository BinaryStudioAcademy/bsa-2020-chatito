import { IUserClient } from '../user/IUserClient';
import { IPostReactionClient } from '../postReaction/IPostReactionClient';

export interface IPostClient {
  id: string;
  createdAt: Date;
  text: string;
  chatId: string;
  createdByUser: IUserClient;
  postReactions: IPostReactionClient[];
}
