import { Router, Request } from 'express';
import { emitToChatRoom } from '../../common/utils/socketHelper';
import { getUserByIdWithoutRelations } from '../../services/userService';
import { run } from '../../common/utils/routeHelper';
import {
  getAllChatPosts,
  addChat,
  getAllUserChats,
  getAllChatUsers,
  removeUserFromChat,
  addUsersToChat,
  getChatById } from '../../services/chatService';
import { addReminder } from '../../services/reminderService';
import { ClientSockets } from '../../common/enums/ClientSockets';
import { IUser } from '../../common/models/user/IUser';

const router = Router();

router
  .get('/:id/posts', run((req: Request) => getAllChatPosts({
    chatId: req.params.id,
    userId: req.user.id,
    ...req.query
  })))
  .get('/', run((req: Request) => getAllUserChats(req.user.id)))
  .get('/:id/users', run((req: Request) => getAllChatUsers(req.params.id)))
  .delete('/:id/users/:userId', run((req: Request) => removeUserFromChat(req.params.id, req.params.userId)))
  .post('/', run(async (req: Request) => {
    const chat = await addChat(req.user.id, req.body);
    req.io.of('/chat').emit(ClientSockets.JoinChat, chat.id);
    return chat;
  }))
  .post('/:id/reminders', run((req: Request) => addReminder(
    {
      chatId: req.params.id,
      userId: req.user.id,
      body: req.body
    }
  )))
  .post('/invite-users', run(async (req: Request) => {
    const users = await addUsersToChat(req.body.chatId, req.body.userIds);
    const usersToEmit: IUser[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const userId of req.body.userIds) {
      const user = await getUserByIdWithoutRelations(userId);
      usersToEmit.push(user);
    }
    const chatInfoToSend = await getChatById(req.body.chatId);
    // eslint-disable-next-line max-len
    emitToChatRoom(req.body.chatId, ClientSockets.NewUserNotification, usersToEmit, chatInfoToSend.name, chatInfoToSend.type, chatInfoToSend.id);
    return users;
  }));

export default router;
