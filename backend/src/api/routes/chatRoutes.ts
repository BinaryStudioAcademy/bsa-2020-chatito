import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import {
  getAllChatPosts,
  addChat,
  getAllUserChats,
  getAllChatUsers,
  removeUserFromChat,
  addUsersToChat,
  getPublicChannel,
  setChatMute
} from '../../services/chatService';
import { addReminder } from '../../services/reminderService';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts({
    chatId: req.params.id,
    userId: req.user.id,
    ...req.query
  })))
  .get('/public/:hash', run((req: Request) => getPublicChannel(req.params.hash, req.user.id)))
  .get('/', run((req: Request) => getAllUserChats(req.user.id)))
  .get('/:id/users', run((req: Request) => getAllChatUsers(req.params.id)))
  .post('/:id/mute', run((req: Request) => setChatMute(req.params.id, req.user.id, req.body.muteValue)))
  .delete('/:id/users/:userId', run((req: Request) => removeUserFromChat(req.params.id, req.params.userId, req.io)))
  .post('/', run((req: Request) => addChat(req.user.id, req.body, req.io)))
  .post('/:id/reminders', run((req: Request) => addReminder({
    chatId: req.params.id,
    userId: req.user.id,
    body: req.body
  })))
  .post('/invite-users', run((req: Request) => addUsersToChat(req.body.chatId, req.body.userIds, req.io)));

export default router;
