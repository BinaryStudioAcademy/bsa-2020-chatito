import { IUnreadChat } from './IUnreadChats';

export interface IPostsToRead {
  postIdsToDelete: string[];
  unreadChatsCopy: IUnreadChat[];
}
