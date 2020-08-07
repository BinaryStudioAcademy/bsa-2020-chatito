interface IUser {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  imageUrl?: string | null | undefined;
  title?: string | null | undefined;
}

export type { IUser };
