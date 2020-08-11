import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/userRepository';
import { IUserClient } from '../common/models/user/IUserClient';
import { fromUserToUserClient } from '../common/mappers/user';
import { fromUserToUserWithWorkspaces } from '../common/mappers/user';

export const getUsers = async () => {
  const users = await getCustomRepository(UserRepository).getAll();
  return users;
};

export const getUserById = async (id: string) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  return fromUserToUserWithWorkspaces(user);
};

export const deleteUser = async (id: string): Promise<void> => {
  await getCustomRepository(UserRepository).deleteUser(id);
};

export const editProfile = async (user: IUserClient) => {
  const editUser = await getCustomRepository(UserRepository).editUser(user.id, user);
  return fromUserToUserClient(editUser);
};
