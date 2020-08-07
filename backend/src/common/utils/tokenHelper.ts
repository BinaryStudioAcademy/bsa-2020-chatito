import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../../config/jwtConfig';
import { IAuthUser } from '../models/user/IAuthUser';

export const createToken = (data: IAuthUser) => jwt.sign(data, secret, { expiresIn });
