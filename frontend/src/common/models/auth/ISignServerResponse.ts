import { IUser } from '../user/IUser';

export interface ISignServerResponse {
  token: string;
  user?: IUser
}
