import { IPost } from './IPost';

export interface IMarkAsUnreadComment {
  postId: string;
  unreadComment: IPost;
}
