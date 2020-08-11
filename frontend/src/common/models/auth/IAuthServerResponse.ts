import { IUser } from '../user/IUser';

export interface IAuthServerResponse {
  accessToken: string;
  refreshToken: string;
  user?: IUser
}
