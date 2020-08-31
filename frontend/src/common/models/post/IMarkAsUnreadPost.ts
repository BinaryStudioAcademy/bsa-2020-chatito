import { IPost } from './IPost';

export interface IMarkAsUnreadPost {
  chatId: string;
  chatType: string;
  unreadPost: IPost;
}
