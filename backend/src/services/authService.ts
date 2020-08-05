import { getCustomRepository } from 'typeorm';

import UserRepository from '../data/repositories/userRepository';

import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { encrypt } from '../common/utils/encryptHelper';
import { signUpResponseMapper } from '../common/utils/userHelper';

export const register = async ({ password, ...userData }: IRegisterUser) => {
  const newUser = await getCustomRepository(UserRepository).addUser({
    ...userData,
    password: await encrypt(password)
  });

  return signUpResponseMapper(newUser);
};
