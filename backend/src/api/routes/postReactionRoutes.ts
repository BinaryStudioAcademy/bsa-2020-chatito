import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { addReaction, deleteReaction } from '../../services/postService';

const router = Router();

router
  .post('/', run((req: Request) => addReaction(req.body.reaction, req.body.postId, req.user.id)))
  .delete('/', run((req: Request) => deleteReaction(req.body.reaction, req.body.postId, req.user.id)));

export default router;
