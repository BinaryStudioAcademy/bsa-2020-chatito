import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getAllChatPosts, addChat, getAllUserChats } from '../../services/chatService';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts(req.params.id)))
  .get('/', run((req: Request) => getAllUserChats(req.user.id)))
  .post('/', run((req: Request) => addChat(req.user.id, req.body)));

export default router;
