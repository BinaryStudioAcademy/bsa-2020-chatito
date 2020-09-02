import bcrypt from 'bcryptjs';
import Cryptr from 'cryptr';
import { env } from '../../env';

const cryptr = new Cryptr(env.app.secret);

const saltRounds = 10;

export const hash = (data: string) => bcrypt.hash(data, saltRounds);

export const compare = (data: string, encrypted: string) => bcrypt.compare(data, encrypted);

export const encrypt = (data: string) => cryptr.encrypt(data);

export const decrypt = (data: string) => cryptr.decrypt(data);
