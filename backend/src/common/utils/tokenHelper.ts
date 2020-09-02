import jwt from 'jsonwebtoken';
import { secret, expiresIn, inviteExpiresIn } from '../../config/jwtConfig';
import { IAuthUser } from '../models/user/IAuthUser';
import { ISendInviteLink } from '../models/inviteLink/ISendInviteLink';

export const createToken = (data: IAuthUser) => jwt.sign(data, secret, { expiresIn });

export const createInviteToken = (data: ISendInviteLink) => jwt.sign(data, secret, { expiresIn: inviteExpiresIn });

export const verifyToken = (token: string) => jwt.verify(token, secret);
