import { IDraftComment } from './IDraftComment';
import { IDraftPost } from './IDraftPost';

export interface IDraftRequest {
  posts: IDraftPost[];
  comments: IDraftComment[];
}
