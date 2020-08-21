import { User } from '../../../data/entities/User';
import { Post } from '../../../data/entities/Post';

export interface IUpsertDraftComment {
  id?: string;
  text: string;
  createdByUserId: string;
  postId: string;
  createdByUser?: User;
  post?: Post;
}
