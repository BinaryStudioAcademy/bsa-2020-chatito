import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { addReaction, updateReaction, deleteReaction } from '../../services/postService';

const router = Router();

router
  .post('/', run((req: Request) => addReaction(req.body.reaction, req.body.postId, req.user.id)))
  .put('/', run((req: Request) => updateReaction(req.body.id, req.body.reaction)))
  .delete('/', run((req: Request) => deleteReaction(req.body.id)));

export default router;
