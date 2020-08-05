import { IUser } from "../user/user";

interface IUserInput {
  email: string;
  password: string;
  fullName?: string;
}

interface ISignServerResponse {
  token: string;
  user?: IUser
}

export type { ISignServerResponse, IUserInput };
