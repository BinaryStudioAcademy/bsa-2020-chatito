import { getCustomRepository } from 'typeorm';

import UserRepository from '../data/repositories/userRepository';
import RefreshTokenRepository from '../data/repositories/refreshTokenRepository';

import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { hash, encrypt, decrypt } from '../common/utils/encryptHelper';
import { fromUserToUserClient, fromRegisterUserToCreateUser } from '../common/mappers/user';
import { createToken } from '../common/utils/tokenHelper';

const createRefreshTokenData = (userId: string) => {
  const cur = new Date();
  const after30days = cur.setDate(cur.getDate() + 30);

  return {
    userId,
    expiresAt: after30days
  };
};

export const register = async ({ password, ...userData }: IRegisterUser) => {
  const passwordHash = await hash(password);
  const createUserData = fromRegisterUserToCreateUser({ ...userData, password: passwordHash });

  const newUser = await getCustomRepository(UserRepository).addUser(createUserData);

  const refreshTokenData = createRefreshTokenData(newUser.id);
  const refreshToken = await getCustomRepository(RefreshTokenRepository).addToken(refreshTokenData);

  return {
    user: fromUserToUserClient(newUser),
    accessToken: createToken({ id: newUser.id }),
    refreshToken: encrypt(refreshToken.id)
  };
};

export const refreshTokens = async (encryptedId: string) => {
  try {
    const id = decrypt(encryptedId);
    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);

    const refreshToken = await refreshTokenRepository.getById(id);

    if (!refreshToken) {
      throw Error('Invalid token');
    } else if (Date.now() > refreshToken.expiresAt) {
      await refreshTokenRepository.deleteToken(id);
      throw Error('Token expired');
    }

    const newRefreshTokenData = createRefreshTokenData(refreshToken.userId);
    const newRefreshToken = await refreshTokenRepository.addToken(newRefreshTokenData);

    await refreshTokenRepository.deleteToken(id);

    return {
      accessToken: createToken({ id: newRefreshToken.userId }),
      refreshToken: encrypt(newRefreshToken.id)
    };
  } catch (err) {
    throw Error('Internal error');
  }
};
