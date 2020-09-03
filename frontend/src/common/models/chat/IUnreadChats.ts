import { IPost } from './../post/IPost';

export interface IUnreadChat {
  id: string;
  unreadPosts: IPost[];
}
