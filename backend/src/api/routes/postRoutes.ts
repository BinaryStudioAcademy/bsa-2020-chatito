import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import {
  addPost,
  editPost,
  addComment,
  getPostComments,
  getPost,
  deletePost,
  editComment,
  deleteComment
} from '../../services/postService';

const router = Router();

router
  .get('/:id/comments', run((req: Request) => getPostComments(req.params.id)))
  .get('/:id', run((req: Request) => getPost(req.params.id)))
  .post('/:id/comments', run((req: Request) => addComment(req.user.id, req.params.id, req.body)))
  .post('/', run((req: Request) => addPost(req.user.id, req.body)))
  .put('/:id', run((req: Request) => editPost(req.params.id, req.body)))
  .put('/:postId/comments/:id', run((req: Request) => editComment(req.params.id, req.body)))
  .delete('/:id', run((req: Request) => deletePost(req.params.id)))
  .delete('/:postId/comments/:id', run((req: Request) => deleteComment(req.params.id)));

export default router;
