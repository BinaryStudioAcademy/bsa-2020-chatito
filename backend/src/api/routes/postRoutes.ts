import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { addPost, editPost, addComment, getPostComments, getPostsByUserId } from '../../services/postService';

const router = Router();

router
  .get('/:id/comments', run((req: Request) => getPostComments(req.params.id)))
  .post('/:id/comments', run((req: Request) => addComment(req.user.id, req.params.id, req.body)))
  .get('/:id/:activeworkspaceid/threads', run((req: Request) => getPostsByUserId(req.params.id, req.params.activeworkspaceid)))
  .post('/', run((req: Request) => addPost(req.user.id, req.body)))
  .put('/', run((req: Request) => editPost(req.body)));

export default router;
