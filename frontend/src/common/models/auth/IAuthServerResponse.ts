import { IUser } from '../user/IUser';

export interface IAuthServerResponse {
  token: string;
  user?: IUser
}
