import { IPost } from '../post/IPost';

export interface IUserUnreadPosts {
  id: string;
  unreadPosts: IPost[];
}
