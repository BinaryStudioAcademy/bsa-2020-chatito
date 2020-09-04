import { IncomingSoundOptions } from '../../enums/IncomingSoundOptions';

export interface IUserClient {
  id: string;
  fullName: string;
  email: string;
  displayName: string;
  imageUrl: string;
  title: string;
  status?: string;
  audio?: string;
  githubUsername?: string;
  incomingSoundOptions?: IncomingSoundOptions;
}
