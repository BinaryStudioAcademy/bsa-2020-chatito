import { emitToChatRoom } from './../../common/utils/socketHelper';
import { getChatById } from './../../services/chatService';
import { getUserByIdWithoutWorkspaces } from './../../services/userService';
import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import {
  getAllChatPosts,
  addChat,
  getAllUserChats,
  getAllChatUsers,
  removeUserFromChat,
  addUsersToChat } from '../../services/chatService';
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
  .post('/invite-users', run(async (req: Request) => {
    const users = await addUsersToChat(req.body.chatId, req.body.userIds)
    let usersToEmit: IUser[] = [];

    for (const userId of req.body.userIds) {
      const user = await getUserByIdWithoutWorkspaces(userId);
      usersToEmit.push(user);
    }
    const chatInfoToSend = await getChatById(req.body.chatId);
    emitToChatRoom(req.body.chatId, ClientSockets.NewUserNotification, usersToEmit, chatInfoToSend.name, chatInfoToSend.type, chatInfoToSend.id);
    return users;
  }))

export default router;
