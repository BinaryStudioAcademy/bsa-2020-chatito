import api from '../common/helpers/apiHelper';
import { IPost } from '../common/models/post/IPost';

export async function editPost(editedPost: IPost): Promise<IPost> {
  const response: IPost = await api.put('/', { editedPost });
  return response;
}

export async function getPosts(): Promise<IPost[]> { // workspace id, thread id?
  const response: IPost[] = await api.get('/');
  return response;
}
