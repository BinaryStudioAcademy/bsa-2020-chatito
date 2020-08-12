import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { addPost, editPost, addReaction,
  updateReaction, deleteReaction } from '../../services/postService';

const router = Router();

router
  .post('/', run((req: Request) => addPost(req.user.id, req.body)))
  .put('/', run((req: Request) => editPost(req.body)))
  .post('/react', run((req: Request) => addReaction(req.body.reaction, req.body.postId, req.user.id)))
  .put('/react', run((req: Request) => updateReaction(req.body.id, req.body.reaction)))
  .delete('/react', run((req: Request) => deleteReaction(req.body.id)));

export default router;
