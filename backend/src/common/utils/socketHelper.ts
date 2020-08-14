import { chatNamespace } from '../../server';

export const emitToChatRoom = (
  roomId: string,
  address: string,
  ...args: any[]
) => {
  chatNamespace.in(roomId).emit(address, ...args);
};
