import { IncomingSoundOptions } from 'common/enums/IncomingSoundOptions';

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  imageUrl?: string | null;
  title?: string;
  status?: string;
  audio: string;
  githubUsername?: string;
  originalUserId?: string;
  incomingSoundOptions?: IncomingSoundOptions;
}
