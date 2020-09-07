import { Socket } from 'socket.io';
import { initJoinToChatRoom } from '../services/socketService';
import { ServerSockets } from '../common/enums/ServerSockets';

export const chatHandlers = (socket: Socket) => {
  initJoinToChatRoom(socket);
  socket.on(ServerSockets.JoinChatRoom, (chatId: string) => socket.join(chatId));
  socket.on(ServerSockets.LeaveChatRoom, (chatId: string) => socket.leave(chatId));
};
