import { IUser } from '../user/IUser';
import { ChatType } from '../../enums/ChatType';
import { Workspace } from '../../../data/entities/Workspace';
import { User } from '../../../data/entities/User';

export interface ICreateChat {
  name: string;
  type: ChatType;
  description?: string;
  isPrivate: boolean;
  workspace: Workspace;
  createdByUser: User;
  users: IUser[];
  hash: string;
}
