import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { addPost, editPost } from '../../services/postService';

const router = Router();

router
  .post('/', run((req: Request) => addPost(req.user.id, req.body)))
  .put('/', run((req: Request) => editPost(req.body)));

export default router;
