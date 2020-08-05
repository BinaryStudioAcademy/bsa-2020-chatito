import { getCustomRepository } from 'typeorm';

import UserRepository from '../data/repositories/userRepository';

import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { encrypt } from '../common/utils/encryptHelper';
import { fromUserToUserClient } from '../common/mappers/user';
import { createToken } from '../common/utils/tokenHelper';

export const register = async ({ password, ...userData }: IRegisterUser) => {
  const newUser = await getCustomRepository(UserRepository).addUser({
    ...userData,
    password: await encrypt(password)
  });

  return {
    user: fromUserToUserClient(newUser),
    token: createToken({ id: newUser.id })
  };
};
