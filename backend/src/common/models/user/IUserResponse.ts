export interface IUserResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    displayName: string;
    imageUrl: string;
    title: string;
  },
  token: string;
}
