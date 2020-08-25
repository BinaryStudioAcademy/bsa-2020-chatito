import { ChatType } from "common/enums/ChatType";
import { IUser } from "../user/IUser";

export interface IChatWithUnread {
  id: string;
  name: string;
  type: ChatType;
  isPrivate: boolean;
  workspaceName: string;
  createdByUserId: string;
  users: IUser[];
  unreadCount?: number;
}
