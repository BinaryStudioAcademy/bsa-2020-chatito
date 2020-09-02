import { IUnreadPost } from './IUnreadPosts';

export interface ICommentsToRead {
  commentIdsToDelete: string[];
  unreadCommentsCopy: IUnreadPost[];
}
