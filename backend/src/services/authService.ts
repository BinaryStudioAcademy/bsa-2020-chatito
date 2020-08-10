import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/userRepository';
import RefreshTokenRepository from '../data/repositories/refreshTokenRepository';

import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { hash, compare, encrypt, decrypt } from '../common/utils/encryptHelper';
import { ILoginUser } from '../common/models/user/ILoginUser';
import { fromUserToUserClient, fromRegisterUserToCreateUser } from '../common/mappers/user';
import { createToken } from '../common/utils/tokenHelper';
import { IRefreshToken } from '../common/models/refreshToken/IRefreshToken';
import { User } from '../data/entities/User';
import { IForgotPasswordUser } from '../common/models/user/IForgotPasswordUser';
import { IResetPasswordUser } from '../common/models/user/IResetPasswordUser';
import CustomError from '../common/models/CustomError';
import { sendResetPasswordMail } from './mailService';
import { ErrorCode } from '../common/enums/ErrorCode';

const createRefreshTokenData = (user: User) => {
  const cur = new Date();
  const after30days = cur.setDate(cur.getDate() + 30);

  return {
    user,
    expiresAt: after30days
  };
};

const createRefreshToken = async (user: User): Promise<IRefreshToken> => {
  try {
    const refreshTokenData = createRefreshTokenData(user);
    const refreshToken = await getCustomRepository(RefreshTokenRepository).addToken(refreshTokenData);

    return refreshToken;
  } catch (err) {
    throw Error('Internal error');
  }
};

export const register = async ({ password, ...userData }: IRegisterUser) => {
  const passwordHash = await hash(password);
  const createUserData = fromRegisterUserToCreateUser({ ...userData, password: passwordHash });

  const newUser = await getCustomRepository(UserRepository).addUser(createUserData);

  const refreshToken = await createRefreshToken(newUser);

  return {
    user: fromUserToUserClient(newUser),
    accessToken: createToken({ id: newUser.id }),
    refreshToken: encrypt(refreshToken.id)
  };
};

export const login = async ({ email, password }: ILoginUser) => {
  try {
    const logUser = await getCustomRepository(UserRepository).getByEmail(email);

    if (logUser) {
      const pwdLogg = await compare(password, logUser.password);

      if (pwdLogg) {
        const refreshToken = await createRefreshToken(logUser);

        return {
          user: fromUserToUserClient(logUser),
          accessToken: createToken({ id: logUser.id }),
          refreshToken: encrypt(refreshToken.id)
        };
      }
    }
    throw new Error('User not found !');
  } catch (err) {
    throw new Error('User not found !');
  }
};

export const removeToken = async (token: string) => {
  try {
    const id = decrypt(token);
    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
    await refreshTokenRepository.deleteToken(id);
    return { result: true };
  } catch (err) {
    throw new CustomError(501, 'Refresh Token Invalid !', ErrorCode.InvalidRefreshToken, err);
  }
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

    const user = await getCustomRepository(UserRepository).getById(refreshToken.userId);
    const newRefreshToken = await createRefreshToken(user);

    await refreshTokenRepository.deleteToken(id);

    return {
      accessToken: createToken({ id: newRefreshToken.userId }),
      refreshToken: encrypt(newRefreshToken.id)
    };
  } catch (err) {
    throw Error(err.message);
  }
};

export const forgotPassword = async ({ email }: IForgotPasswordUser) => {
  const user = await getCustomRepository(UserRepository).getByEmail(email);
  if (!user) {
    throw new CustomError(404, 'Wrong email', ErrorCode.UserNotFound);
  }

  await sendResetPasswordMail({ to: email, token: createToken({ id: user.id }) });
  return user;
};

export const resetPassword = async ({ id, password }: IResetPasswordUser) => {
  const passwordHash = await encrypt(password);
  const user = await getCustomRepository(UserRepository).editPassword(id, passwordHash);
  return user;
};
