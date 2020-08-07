import { User } from '../../../data/entities/User';

export interface ICreateRefreshToken {
  expiresAt: number;
  user: User;
}
