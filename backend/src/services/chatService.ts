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
import { ChatType } from '../common/enums/ChatType';
import { fromPostToPostClient } from '../common/mappers/post';

export const getAllChatPosts = async (chatId: string) => {
  const chatPosts: IPost[] = await getCustomRepository(PostRepository).getAllChatPosts(chatId);
  const mappedChatPosts = Promise.all(chatPosts.map(async post => fromPostToPostClient(post)));
  return mappedChatPosts;
};

export const getAllUserChats = async (userId: string) => {
  // const chats: IChat[] = await getCustomRepository(UserRepository).getAllUserChats(userId);
  const chats: IChat[] = await getCustomRepository(ChatRepository).getAllByUser(userId);
  const directs = chats.filter(({ type }) => type === ChatType.DirectMessage);
  const channels = chats.filter(({ type }) => type === ChatType.Channel);
  return { directs, channels };
};

export const addChat = async (userId: string, body: IChatData) => {
  const { workspaceName, users = [], ...chatFields } = body;
  const userCreator: User = await getCustomRepository(UserRepository).getById(userId);
  const workspace: Workspace = await getCustomRepository(WorkspaceRepository).findByName(workspaceName);
  const newChat: ICreateChat = {
    ...chatFields,
    workspace,
    createdByUser: userCreator,
    users: [userCreator, ...users]
  };
  const chat: IChat = await getCustomRepository(ChatRepository).addChat(newChat);
  return chat;
};
