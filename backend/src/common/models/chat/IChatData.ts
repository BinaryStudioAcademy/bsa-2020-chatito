import { ChatType } from '../../enums/ChatType';
import { IUser } from '../user/IUser';

export interface IChatData {
  name: string;
  description?: string;
  type: ChatType;
  isPrivate: boolean;
  workspaceName: string;
  createdByUserId: string;
  users?: IUser[];
}
