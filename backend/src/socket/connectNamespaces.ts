import { Socket } from 'socket.io';
import { chatHandlers } from './chatHandlers';
import { chatNamespace } from '../server';

export const registerSockets = () => {
  chatNamespace.on('connection', (socket: Socket) => chatHandlers(socket));
};
