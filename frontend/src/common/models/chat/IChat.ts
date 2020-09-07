import { IPost } from './../post/IPost';
import { ChatType } from "common/enums/ChatType";
import { IUser } from "../user/IUser";
import { IWorkspace } from "../workspace/IWorkspace";
import { IDraftPost } from "../draft/IDraftPost";

export interface IChat {
  id: string;
  name: string;
  type: ChatType;
  description?: string;
  isPrivate: boolean;
  workspace: IWorkspace;
  workspaceId: string;
  createdByUserId: string;
  users: IUser[]
  unreadCount?: number;
  hash: string;
  draftPosts?: IDraftPost[];
  isMuted?: boolean;
}
