import { ChatType } from "common/enums/ChatType";
import { IUser } from "../user/IUser";

export interface IChatWithUnread {
  id: string;
  name: string;
  type: ChatType;
  description?: string;
  isPrivate: boolean;
  workspaceName: string;
  createdByUserId: string;
  users: IUser[];
  unreadCount?: number;
}
