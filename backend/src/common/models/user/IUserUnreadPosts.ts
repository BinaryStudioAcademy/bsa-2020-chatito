import { Post } from '../../../data/entities/Post';

export interface IUserUnreadPosts {
  id: string;
  unreadPosts: Post[] | []
}
