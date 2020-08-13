import { io } from '../../server';

export const emitToChatRoom = (
  roomId: string,
  address: string,
  ...args: any[]
) => {
  io.in(roomId).emit(address, ...args);
};
