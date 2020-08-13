import { IUser } from 'common/models/user/IUser';
import { ChatType } from "common/enums/ChatType";

export interface ICreateChat {
  name: string;
  description?: string;
  type: ChatType;
  isPrivate: boolean;
  workspaceName: string;
  users?: IUser[];
}
