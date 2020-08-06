import { getCustomRepository } from 'typeorm';
import { IUserClient } from '../common/models/user/IUserClient';
import UserRepository from '../data/repositories/userRepository';
import { fromUserToUserClient } from '../common/mappers/user';

export const getUsers = async () => {
  const users = await getCustomRepository(UserRepository).getAll();
  return users;
};

export const getUserById = async (id: string) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  return user;
};

export const editProfile = async (user: IUserClient) => {
  const editUser = await getCustomRepository(UserRepository).editUser(user.id, user);
  return fromUserToUserClient(editUser);
};
