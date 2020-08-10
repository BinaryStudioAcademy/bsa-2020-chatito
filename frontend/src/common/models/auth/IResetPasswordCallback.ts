import { IResetPasswordInput } from './IResetPasswordInput';

export interface IResetPasswordCallback extends IResetPasswordInput {
  token: string;
}
