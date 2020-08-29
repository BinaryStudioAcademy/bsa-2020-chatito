export interface IGetChatPosts {
  userId: string;
  chatId: string;
  from?: number;
  count?: number;
  postId?: string;
}
