import { IUser } from './IUser';

export interface IUserState {
  data: IUser | null;
  isLoading: boolean;
  isAuthorized: boolean;
}
