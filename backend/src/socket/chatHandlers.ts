import { Socket } from 'socket.io';
import { initJoinToChatRoom, joinToChatRoom } from '../services/socketService';

export const chatHandlers = (socket: Socket) => {
  initJoinToChatRoom(socket);
  socket.on('joinChatRoom', (chatId: string) => joinToChatRoom(socket, chatId));
};
