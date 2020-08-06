import { IUser } from '../user/IUser';

interface ISignServerResponse {
  token: string;
  user?: IUser
}

export type { ISignServerResponse };
