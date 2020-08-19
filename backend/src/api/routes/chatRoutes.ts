import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import {
  getAllChatPosts,
  addChat,
  getAllUserChats,
  getAllChatUsers,
  removeUserFromChat } from '../../services/chatService';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts({ chatId: req.params.id, ...req.query })))
  .get('/', run((req: Request) => getAllUserChats(req.user.id)))
  .get('/:id/users', run((req: Request) => getAllChatUsers(req.params.id)))
  .delete('/:id/users/:userId', run((req: Request) => removeUserFromChat(req.params.id, req.params.userId)))
  .post('/', run(async (req: Request) => {
    const chat = await addChat(req.user.id, req.body);
    req.io.of('/chat').emit('joinChat', chat.id);
    return chat;
  }))
  .post('/:id/reminders', run((req: Request) => addReminder({ chatId: req.params.id, body: req.body })));

export default router;
