import { IUserServer } from '../user/IUserServer';

export interface IAuthServerResponse {
  accessToken: string;
  refreshToken: string;
  user?: IUserServer
}
