import { getCustomRepository } from 'typeorm';

import UserRepository from '../data/repositories/userRepository';
import RefreshTokenRepository from '../data/repositories/refreshTokenRepository';

import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { encrypt } from '../common/utils/encryptHelper';
import { fromUserToUserClient, fromRegisterUserToCreateUser } from '../common/mappers/user';
import { createToken, createRefreshTokenData } from '../common/utils/tokenHelper';
import { encryptString, decryptString } from '../common/utils/cryptrHelper';

export const register = async ({ password, ...userData }: IRegisterUser) => {
  const passwordHash = await encrypt(password);
  const createUserData = fromRegisterUserToCreateUser({ ...userData, password: passwordHash });

  const newUser = await getCustomRepository(UserRepository).addUser(createUserData);

  const refreshTokenData = createRefreshTokenData(newUser.id);
  const refreshToken = await getCustomRepository(RefreshTokenRepository).addToken(refreshTokenData);

  return {
    user: fromUserToUserClient(newUser),
    accessToken: createToken({ id: newUser.id }),
    refreshToken: encryptString(refreshToken.id)
  };
};

export const refreshTokens = async (encryptedId: string) => {
  try {
    const id = decryptString(encryptedId);
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
      refreshToken: encryptString(newRefreshToken.id)
    };
  } catch (err) {
    throw Error('Internal error');
  }
};
