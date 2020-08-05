import { IRegisterUser } from './IRegisterUser';

export interface ICreateUser extends IRegisterUser {
  displayName: string;
}
