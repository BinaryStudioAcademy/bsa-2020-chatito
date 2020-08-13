import { IPost } from '../post/IPost';

export interface IActiveThread {
  post: IPost;
  comments: IPost[];
}
