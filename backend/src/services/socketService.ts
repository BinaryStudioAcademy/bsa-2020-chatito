import { Socket } from 'socket.io';
import { getAllUserChats } from './chatService';

export const initJoinToChatRoom = async (socket: Socket) => {
  const { user } = socket.request;
  const chats = await getAllUserChats(user.id);

  chats.channels.forEach(chat => socket.join(chat.id));
  chats.directs.forEach(chat => socket.join(chat.id));
  chats.githubRepositories.forEach(chat => socket.join(chat.id));
};
