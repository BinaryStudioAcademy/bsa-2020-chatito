export interface IDraftCommentClient {
  id: string;
  text: string;
  chat?: {
    hash?: string;
    name?: string;
  },
  postId?: string;
}
