import { IUser } from '../user/IUser';

interface IUserInput {
  email: string;
  password: string;
  fullName?: string;
}

interface ISignServerResponse {
  token: string;
  user?: IUser
}

interface ISignUpFields {
  email: string;
  password: string;
  fullName: string;
}

interface ISignInFields {
  email: string;
  password: string;
}

export type { ISignServerResponse, IUserInput, ISignInFields, ISignUpFields };
