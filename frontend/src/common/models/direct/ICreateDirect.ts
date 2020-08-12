import { IUser } from 'common/models/user/IUser';
import { ChatType } from "common/enums/ChatType";

export interface ICreateDirect {
  name: string;
  type: ChatType;
  isPrivate: boolean;
  workspaceName: string;
  users: IUser[];
}
