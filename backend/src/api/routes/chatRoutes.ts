import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getAllChatPosts, getAll } from '../../services/chatService';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts(req.params.id)))
  .get('/', run(() => getAll()));
export default router;
