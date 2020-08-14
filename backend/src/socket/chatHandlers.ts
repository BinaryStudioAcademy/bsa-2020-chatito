import { Socket } from 'socket.io';
import { initJoinToChatRoom, joinToChatRoom } from '../services/socketService';
import { ServerSockets } from '../common/enums/ServerSockets';

export const chatHandlers = (socket: Socket) => {
  initJoinToChatRoom(socket);
  socket.on(ServerSockets.JoinChatRoom, (chatId: string) => joinToChatRoom(socket, chatId));
};
