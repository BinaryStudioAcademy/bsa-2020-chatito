export interface IDraftClient {
  id: string;
  text: string;
  chat: {
    name:string;
    hash:string;
  }
  postId?: string;
}
