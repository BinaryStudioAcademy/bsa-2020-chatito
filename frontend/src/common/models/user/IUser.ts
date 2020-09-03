export interface IUser {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  imageUrl?: string | null;
  title?: string;
  status?: string;
  githubUsername?: string;
}
