import Cryptr from 'cryptr';
import { env } from '../../env';

const cryptr = new Cryptr(env.app.secret);

export const encryptString = (data: string) => cryptr.encrypt(data);

export const decryptString = (data: string) => cryptr.decrypt(data);
