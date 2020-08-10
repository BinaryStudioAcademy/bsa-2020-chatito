import { IUser } from '../user/IUser';

export interface IAuthServerResponse {
  accessToken: string;
  user?: IUser
}
