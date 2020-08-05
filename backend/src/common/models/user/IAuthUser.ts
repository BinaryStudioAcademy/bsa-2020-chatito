export interface IAuthUser {
  id: string;
}

export interface IRegisterUser {
  fullName: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string,
  fullName: string,
  email: string,
  password: string,
  displayName: string,
  imageUrl: string,
  title: string
}

export interface IUserResponse extends IUser {
  token: string,
}
