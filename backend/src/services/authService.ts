import userRepository from '../data/repositories/userRepository';
import { IRegisterUser } from '../common/models/user';
import { encrypt } from '../common/utils/encryptHelper';

export const register = async ({ password, ...userData }: IRegisterUser) => {
  const newUser = await userRepository.addUser({
    ...userData,
    password: await encrypt(password)
  });

  return {
    ...newUser,
    token: 'token'
  };
};
