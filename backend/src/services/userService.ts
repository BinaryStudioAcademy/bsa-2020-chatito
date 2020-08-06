import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/userRepository';
import { IUserClient } from '../common/models/user/IUserClient';
import { fromUserToUserClient } from '../common/mappers/user';

const users = [{
  id: '1',
  name: 'Alik'
}, {
  id: '2',
  name: 'Petr'
}];

export const getUsers = () => Promise.resolve(users);

export const getUserById = (id: string) => Promise.resolve(users.find(u => u.id === id));

export const deleteUser = async (id: string) => {
  const deletedUser = await getCustomRepository(UserRepository).deleteUser(id);
  return {
    user: fromUserToUserClient(deletedUser)
  };
};

export const editProfile = async (user: IUserClient) => {
  const editUser = await getCustomRepository(UserRepository).editUser(user.id, user);
  return {
    user: fromUserToUserClient(editUser)
  };
};
