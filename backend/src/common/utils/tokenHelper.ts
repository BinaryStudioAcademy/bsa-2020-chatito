import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../../config/jwtConfig';
import { IAuthUser } from '../models/user/IAuthUser';

const msInOneDay = 864e5;
const refreshTokenExpireTime = msInOneDay * 30;

export const createToken = (data: IAuthUser) => jwt.sign(data, secret, { expiresIn });

export const createRefreshTokenData = (userId: string) => ({
  userId,
  expiresAt: Date.now() + refreshTokenExpireTime
});
