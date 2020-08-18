import { IPost } from '../post/IPost';
import { IUser } from '../user/IUser';

export interface ICreatePostReaction {
  reaction: string;
  post: Partial<IPost>;
  user: Partial<IUser>;
}
