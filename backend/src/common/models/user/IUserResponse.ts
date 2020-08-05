import { IUserClient } from './IUserClient';

export interface IUserResponse {
  user: IUserClient,
  token: string;
}
