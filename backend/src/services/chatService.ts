import { getCustomRepository } from 'typeorm';
import { Workspace } from '../data/entities/Workspace';
import { User } from '../data/entities/User';
import { IChatData } from '../common/models/chat/IChatData';
import { ICreateChat } from '../common/models/chat/ICreateChat';
import PostRepository from '../data/repositories/postRepository';
import { IPost } from '../common/models/post/IPost';
import { IChat } from '../common/models/chat/IChat';
import ChatRepository from '../data/repositories/chatRepository';
import UserRepository from '../data/repositories/userRepository';
import WorkspaceRepository from '../data/repositories/workspaceRepository';

export const getAllChatPosts = async (chatId: string) => {
  const chatPosts: IPost[] = await getCustomRepository(PostRepository).getAllChatPosts(chatId);
  return chatPosts;
};

export const addChat = async (userId: string, body: IChatData) => {
  const { workspaceName, ...chatFields } = body;
  const userCreator: User = await getCustomRepository(UserRepository).getById(userId);
  const workspace: Workspace = await getCustomRepository(WorkspaceRepository).findByName(workspaceName);
  const newChat: ICreateChat = {
    ...chatFields,
    workspace,
    createdByUser: userCreator,
    users: [userCreator]
  };
  const chat: IChat = await getCustomRepository(ChatRepository).addChat(newChat);

  return chat;
};
