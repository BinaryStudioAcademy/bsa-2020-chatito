interface IUser {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  imageUrl: string | null | undefined;
  title: string | null | undefined;
}

interface IUserState {
  data: IUser | null;
  isLoading: boolean;
  isAuthorized: boolean;
}

export type { IUser, IUserState };
