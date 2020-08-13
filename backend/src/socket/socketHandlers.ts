import { Socket } from 'socket.io';
import { initJoinToChatRoom } from '../services/socketService';

export default (socket: Socket) => {
  initJoinToChatRoom(socket);
  socket.on('joinRoom', (roomId: string) => {
    console.log('123');
    socket.join(roomId);
  });
  socket.on('leaveRoom', (roomId: string) => {
    socket.leave(roomId);
  });
};
