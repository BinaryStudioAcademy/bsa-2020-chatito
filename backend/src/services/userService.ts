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
  return user;
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
  const editUser = await getCustomRepository(UserRepository).editUser(userId, data);
  return fromUserToUserClient(editUser);
};

export const editStatus = async ({ id, status }: IEditStatus) => {
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

export const getUnreadPostsById = async (userId: string) => {
  const unreadUserPostIds = await getCustomRepository(UserRepository).getUnreadPostsById(userId);
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

export const getUnreadCommentsById = async (userId: string) => {
  const unreadUserPostIds = await getCustomRepository(UserRepository).getUnreadCommentsById(userId);
  return unreadUserPostIds;
};
