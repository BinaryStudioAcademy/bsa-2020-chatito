import { getCustomRepository } from 'typeorm';
import cryptoRandomString from 'crypto-random-string';
import { Workspace } from '../data/entities/Workspace';
import { fromUserToUserClient } from '../common/mappers/user';
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
import { IUser } from '../common/models/user/IUser';
import { IGetChatPosts } from '../common/models/chat/IGetChatPosts';

export const getAllChatPosts = async (filter: IGetChatPosts) => {
  const chatPosts: IPost[] = await getCustomRepository(PostRepository).getAllChatPosts(filter);
  const mappedChatPosts = Promise.all(chatPosts.map(async post => fromPostToPostClient(post)));
  return mappedChatPosts;
};

export const getAllChatUsers = async (chatId: string) => {
  const chatUsers: IUser[] = await getCustomRepository(ChatRepository).getAllChatUsers(chatId);
  return chatUsers.map(user => fromUserToUserClient(user));
};

export const getAllUserChats = async (userId: string) => {
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
    users: [userCreator, ...users],
    hash: cryptoRandomString({ length: 7, type: 'url-safe' }).toUpperCase()
  };
  const chat: IChat = await getCustomRepository(ChatRepository).addChat(newChat);
  return chat;
};

export const removeUserFromChat = async (chatId: string, userId: string): Promise<unknown> => {
  await getCustomRepository(ChatRepository).removeUser(chatId, userId);
  return {}; // In search for a better solution
};
