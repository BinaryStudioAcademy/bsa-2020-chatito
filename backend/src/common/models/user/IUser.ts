import { IncomingSoundOptions } from '../../enums/IncomingSoundOptions';

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  displayName: string;
  imageUrl?: string;
  title?: string;
  status?: string;
  audio?: string;
  githubUsername?: string;
  incomingSoundOptions?: IncomingSoundOptions;
}
