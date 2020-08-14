import { Socket } from 'socket.io';

export default (socket: Socket) => {
  socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId);
  });
  socket.on('leaveRoom', (roomId: string) => {
    socket.leave(roomId);
  });
};
