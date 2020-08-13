import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getAllChatPosts, addChat, getAllUserChats } from '../../services/chatService';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts(req.params.id)))
  .get('/', run((req: Request) => getAllUserChats(req.user.id)))
  .post('/', run(async (req: Request) => {
    try {
      const chat = await addChat(req.user.id, req.body);
      req.io.emit('joinRoom', chat.id);
      return chat;
    } catch (error) {
      console.error(error.message);
      return 'mock';
    }
  }));

export default router;
