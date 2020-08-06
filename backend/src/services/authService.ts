import { getCustomRepository } from 'typeorm';

import UserRepository from '../data/repositories/userRepository';
import { IRegisterUser, IUserId } from '../common/models/user/IRegisterUser';
import { encrypt } from '../common/utils/encryptHelper';
import { fromUserToUserClient, fromRegisterUserToCreateUser } from '../common/mappers/user';
import { createToken } from '../common/utils/tokenHelper';

export const login = async ({ id }: IUserId) => {
  const logUser = await getCustomRepository(UserRepository).getById(id);
  return {
    user: fromUserToUserClient(logUser),
    token: createToken({ id: logUser.id })
  };
};

export const register = async ({ password, ...userData }: IRegisterUser) => {
  const passwordHash = await encrypt(password);
  const createUserData = fromRegisterUserToCreateUser({ ...userData, password: passwordHash });

  const newUser = await getCustomRepository(UserRepository).addUser(createUserData);

  return {
    user: fromUserToUserClient(newUser),
    token: createToken({ id: newUser.id })
  };
};
