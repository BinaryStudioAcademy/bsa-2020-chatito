import { Socket } from 'socket.io';
import { getCustomRepository } from 'typeorm';
import { getAllUserChats } from './chatService';
import ChatRepository from '../data/repositories/chatRepository';

export const initJoinToChatRoom = async (socket: Socket) => {
  const { user } = socket.request;
  const chats = await getAllUserChats(user.id);

  chats.channels.forEach(chat => socket.join(chat.id));
  chats.directs.forEach(chat => socket.join(chat.id));
  chats.githubRepositories.forEach(chat => socket.join(chat.id));
};

export const joinToChatRoom = async (socket: Socket, chatId: string) => {
  const { id } = socket.request.user;
  const chat = await getCustomRepository(ChatRepository).getByIdWithUsers(chatId);
  const user = chat.users.find(chatUser => chatUser.id === id);
  if (user) {
    socket.emit('addChat', chat);
    socket.join(chatId);
  }
};
