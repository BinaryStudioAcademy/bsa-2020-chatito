import { io } from '../../server';

export const emitToRoom = (
  roomId: string,
  address: string,
  ...args: any[]
) => {
  io.in(roomId).emit(address, ...args);
};
