import { env } from '../env';

export const { secret } = env.app;
export const expiresIn = '24h';
export const inviteExpiresIn = '48h';
