import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import {
  getAllChatPosts,
  addChat,
  getAllUserChats,
  getAllChatUsers,
  removeUserFromChat,
  addUsersToChat } from '../../services/chatService';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts(req.user.id, { chatId: req.params.id, ...req.query })))
  .get('/', run((req: Request) => getAllUserChats(req.user.id)))
  .get('/:id/users', run((req: Request) => getAllChatUsers(req.params.id)))
  .delete('/:id/users/:userId', run((req: Request) => removeUserFromChat(req.params.id, req.params.userId)))
  .post('/', run(async (req: Request) => {
    const chat = await addChat(req.user.id, req.body);
    req.io.of('/chat').emit('joinChat', chat.id);
    return chat;
  }))
  .post('/invite-users', run((req: Request) => addUsersToChat(req.body.chatId, req.body.userIds)));

export default router;
