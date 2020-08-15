export interface IPostReaction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  reaction: string;
  postId: string;
  userId: string;
}
