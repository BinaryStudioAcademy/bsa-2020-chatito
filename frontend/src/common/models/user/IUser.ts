interface IUser {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  imageUrl?: string | null;
  title?: string | null;
}

interface IUserState {
  data: IUser | null;
  isLoading: boolean;
  isAuthorized: boolean;
}

export type { IUser, IUserState };

