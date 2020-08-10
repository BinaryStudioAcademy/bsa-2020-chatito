import { User } from '../../../data/entities/User';
import { Workspace } from '../../../data/entities/Workspace';
import { ChatType } from '../../enums/ChatType';

export interface IChat {
  name: string;
  type: ChatType;
  isPrivate: boolean;
  workspace: Workspace;
  createdByUser: User;
  users: User[];
}
