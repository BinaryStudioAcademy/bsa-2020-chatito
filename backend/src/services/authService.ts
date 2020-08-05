import { getCustomRepository } from 'typeorm';

import UserRepository from '../data/repositories/userRepository';

import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { encrypt } from '../common/utils/encryptHelper';
import { fromUserToUserClient, fromRegisterUserToCreateUser } from '../common/mappers/user';
import { createToken } from '../common/utils/tokenHelper';

export const register = async ({ password, ...userData }: IRegisterUser) => {
  const passwordHash = await encrypt(password);
  const createUserData = fromRegisterUserToCreateUser({ ...userData, password: passwordHash });

  const newUser = await getCustomRepository(UserRepository).addUser(createUserData);

  return {
    user: fromUserToUserClient(newUser),
    token: createToken({ id: newUser.id })
  };
};
