import { IUser } from './IUser';

interface IUserState {
  data: IUser | null;
  isLoading: boolean;
  isAuthorized: boolean;
}

export type { IUserState };
