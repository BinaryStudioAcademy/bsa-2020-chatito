import { ChatType } from "common/enums/ChatType";
import { IUser } from "../user/IUser";
import { IWorkspace } from "../workspace/IWorkspace";

export interface IChat {
  id: string;
  name: string;
  type: ChatType;
  isPrivate: boolean;
  workspace: IWorkspace;
  createdByUserId: string;
  users: IUser[]
  unreadCount?: number;
  hash: string;
}
