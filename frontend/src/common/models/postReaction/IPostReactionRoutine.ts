import { IPost } from "../post/IPost";

export interface IPostReactionRoutine {
  post: IPost;
  reaction: string;
}
