import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/userRepository';
import WorkspaceRepository from '../data/repositories/workspaceRepository';
import { IUserClient } from '../common/models/user/IUserClient';
import { fromUserToUserClient, fromUserToUserWithWorkspaces } from '../common/mappers/user';
import { IEditStatus } from '../common/models/user/IEditStatus';
import { ICheckInvitedUserRegistered } from '../common/models/user/ICheckRegistered';
import { IDecodedInviteLinkToken } from '../common/models/inviteLink/IDecodedInviteLinkToken';
import { fromCreatedWorkspaceToClient } from '../common/mappers/workspace';
import { verifyToken } from '../common/utils/tokenHelper';
import CustomError from '../common/models/CustomError';
import { ErrorCode } from '../common/enums/ErrorCode';
import PostRepository from '../data/repositories/postRepository';

export const getUsers = async () => {
  const users = await getCustomRepository(UserRepository).getAll();
  const clientUsers = users.map(user => fromUserToUserClient(user));
  return clientUsers;
};

export const getUserById = async (id: string) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  return fromUserToUserWithWorkspaces(user);
};

export const getUserByIdWithoutRelations = async (id: string) => {
  const user = await getCustomRepository(UserRepository).getByIdWithoutRelations(id);
  const clientUser = fromUserToUserClient(user);
  return clientUser;
};

export const deleteUser = async (id: string): Promise<unknown> => {
  const user = await getCustomRepository(UserRepository).getById(id);
  if (user.workspacesCreated.length !== 0) {
    throw new CustomError(
      500,
      'Cannot delete user with active workspace, created by this user.',
      ErrorCode.UserHaveCreatedWorkspace
    );
  }
  await getCustomRepository(UserRepository).deleteUser(id);
  return {};
};

export const editProfile = async (userId: string, data: Partial<IUserClient>) => {
  if (data.title && data.title.length > 100) {
    throw new CustomError(
      400,
      'Enter less than 100 symbols.',
      ErrorCode.TooLongUserLifePosition
    );
  }
  const editUser = await getCustomRepository(UserRepository).editUser(userId, data);
  return fromUserToUserClient(editUser);
};

export const editStatus = async ({ id, status }: IEditStatus) => {
  if (status.length > 103) {
    throw new CustomError(
      400,
      'Enter less than 100 symbols.',
      ErrorCode.TooLongUserStatus
    );
  }
  const newStatus = await getCustomRepository(UserRepository).editStatus(id, status);
  return [newStatus];
};

export const checkInvitedUserRegistered = async ({ token }: ICheckInvitedUserRegistered) => {
  const { email, workspaceId } = verifyToken(token) as IDecodedInviteLinkToken;
  const user = await getCustomRepository(UserRepository).getByEmail(email);
  const workspace = await getCustomRepository(WorkspaceRepository).getById(workspaceId);

  return {
    isRegistered: Boolean(user),
    invitedUserEmail: email,
    workspace: fromCreatedWorkspaceToClient(workspace)
  };
};

export const addWorkspaceToUser = async (userId: string, workspaceId: string) => {
  try {
    const user = await getCustomRepository(UserRepository).addWorkspace(userId, workspaceId);
    return user;
  } catch (error) {
    throw new CustomError(409, 'User already exists in workspace. ', ErrorCode.UserExistsInWorkspace);
  }
};

export const addToWorkspace = async (userId: string, workspaceId: string) => {
  try {
    const user = await getCustomRepository(UserRepository).addWorkspace(userId, workspaceId);
    return fromUserToUserWithWorkspaces(user);
  } catch (error) {
    throw new CustomError(409, 'User already exists in workspace. ', ErrorCode.UserExistsInWorkspace);
  }
};

export const markAsUnreadPost = async (userId: string, postId: string) => {
  await getCustomRepository(UserRepository).markAsUnreadPost(userId, postId);
  const post = await getCustomRepository(PostRepository).getById(postId);
  return { ...post };
};

export const markAsReadPosts = async (userId: string, postIds: string[]) => {
  const response: string[] = [];
  for (let i = 0; i < postIds.length; i += 1) {
    const responsePostId = await getCustomRepository(UserRepository).markAsReadPosts(userId, postIds[i]);
    response.push(responsePostId);
  }
  return response;
};

export const getUnreadPostsById = async (wpId: string, userId: string) => {
  const unreadUserPostIds = await getCustomRepository(UserRepository).getUnreadPostsById(userId, wpId);
  if (!unreadUserPostIds) {
    return { id: userId, unreadPosts: [] };
  }
  return unreadUserPostIds;
};

export const markAsUnreadComment = async (userId: string, postId: string) => {
  const responsePostId = await getCustomRepository(UserRepository).markAsUnreadComment(userId, postId);
  return [responsePostId];
};

export const markAsReadComments = async (userId: string, postIds: string[]) => {
  const response: string[] = [];
  for (let i = 0; i < postIds.length; i += 1) {
    const responsePostId = await getCustomRepository(UserRepository).markAsReadComments(userId, postIds[i]);
    response.push(responsePostId);
  }
  return response;
};

export const getUnreadCommentsById = async (wpId: string, userId: string) => {
  const unreadUserPostIds = await getCustomRepository(UserRepository).getUnreadCommentsById(userId, wpId);
  if (!unreadUserPostIds) {
    return { id: userId, unreadPosts: [] };
  }
  return unreadUserPostIds;
};

export const createGithubUser = async () => {
  const newUserData = {
    fullName: 'GitHub Bot',
    displayName: 'GitHub Bot',
    email: 'github@github.com',
    password: ''
  };
  const user = await getCustomRepository(UserRepository).addUser(newUserData);
  // await addWorkspaceToUser(user.id, workspaceId);

  return user;
};

export const getGithubUser = async () => {
  const user = await getCustomRepository(UserRepository).getByEmail('github@github.com');
  return user || createGithubUser();
};

export const getUserByEmail = async (email: string) => {
  const user = await getCustomRepository(UserRepository).getByEmail(email);
  return user || createGithubUser();
};

