export interface IGetNavigatePost {
  userId: string;
  chatId: string;
  from?: number;
  count?: number;
  postCreatedAt?: Date;
}
