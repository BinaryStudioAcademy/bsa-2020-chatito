import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getAllChatPosts } from '../../services/chatService';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts(req.params.id)));

export default router;
