import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/userRepository';
import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { ILoginUser } from '../common/models/user/ILoginUser';
import { encrypt, compare } from '../common/utils/encryptHelper';
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

export const login = async ({ email, password }: ILoginUser) => {
  try {
    const logUser = await getCustomRepository(UserRepository).getByEmail(email);
    if (logUser) {
      const pwdLogg = await compare(password, logUser.password);
      if (pwdLogg) {
        return {
          user: fromUserToUserClient(logUser),
          token: createToken({ id: logUser.id })
        };
      }
    }
    throw new Error('User not found !');
  } catch (err) {
    throw new Error('User not found !');
  }
};
