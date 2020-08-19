import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getAllChatPosts, addChat, getAllUserChats, addUsersToChat } from '../../services/chatService';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts(req.params.id)))
  .get('/', run((req: Request) => getAllUserChats(req.user.id)))
  .post('/', run(async (req: Request) => {
    const chat = await addChat(req.user.id, req.body);
    req.io.of('/chat').emit('joinChat', chat.id);
    return chat;
  }))
  .post('/invite-users', run((req: Request) => addUsersToChat(req.body.chatId, req.body.userIds)));

export default router;
