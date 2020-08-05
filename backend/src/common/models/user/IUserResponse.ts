import { IUser } from './IUser';

export interface IUserResponse extends IUser {
  token: string,
}
