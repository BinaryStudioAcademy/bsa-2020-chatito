import { getCustomRepository } from 'typeorm';
import { ErrorCode } from '../common/enums/ErrorCode';

import WorkspaceRepository from '../data/repositories/workspaceRepository';
import UserRepository from '../data/repositories/userRepository';
import PostRepository from '../data/repositories/postRepository';
import { IClientCreateWorkspace } from '../common/models/workspace/IClientCreateWorkspace';
import { IWorkspaceResponse } from '../common/models/workspace/IWorkspaceResponse';
import { fromCreatedWorkspaceToClient, fromClientCreateWorkspaceToCreateWorkspace } from '../common/mappers/workspace';
import { IUser } from '../common/models/user/IUser';
import CustomError from '../common/models/CustomError';
import ChatRepository from '../data/repositories/chatRepository';
import { fromChatToClientChat } from '../common/mappers/chat';
import { ChatType } from '../common/enums/ChatType';
import { fromCommentsToCommentsWithUserImageUrl } from '../common/mappers/post';

export const createWorkspace = async (data: IClientCreateWorkspace): Promise<IWorkspaceResponse> => {
  const { name } = data;
  const isWorkspaceExist = await getCustomRepository(WorkspaceRepository).findByName(name);
  if (isWorkspaceExist) {
    throw new CustomError(500,
      'This workspace is already exists! Please, choose the other name for your workspace.',
      ErrorCode.WorkspaceAlreadyExists);
  }
  const workspaceData = fromClientCreateWorkspaceToCreateWorkspace(data);
  const user = await getCustomRepository(UserRepository).getById(data.createdByUserId);
  const newWorkspace = await getCustomRepository(WorkspaceRepository).addWorkspace(workspaceData, user);
  return fromCreatedWorkspaceToClient(newWorkspace);
};

export const getWorkspaceUsers = async (id: string): Promise<IUser[]> => {
  const workspace = await getCustomRepository(WorkspaceRepository).getByIdWithUsers(id);
  return workspace.users;
};

export const getThreads = async (workspaceId: string, userId: string) => {
  const posts = await getCustomRepository(PostRepository).getPostsByUserId(workspaceId, userId);
  const mappedPosts = posts.map(post => ({ ...post, comments: fromCommentsToCommentsWithUserImageUrl(post.comments) }));
  return mappedPosts;
};

export const getWorkspaceUserChats = async (workspaceId: string, userId: string): Promise<any> => {
  const chats = await (await getCustomRepository(ChatRepository).getAllByWorkspaceIdAndUserId(workspaceId, userId));
  const clientChats = chats.map(chat => fromChatToClientChat(chat));

  const channels = clientChats.filter(chat => chat.type === ChatType.Channel);
  const directMessages = clientChats.filter(chat => chat.type === ChatType.DirectMessage);
  const githubRepositories = clientChats.filter(chat => chat.type === ChatType.GithubRepository);

  return { channels, directMessages, githubRepositories };
};

export const getWorkspaceByName = async (name: string) => {
  const wp = await getCustomRepository(WorkspaceRepository).findByName(name);
  return wp;
};
