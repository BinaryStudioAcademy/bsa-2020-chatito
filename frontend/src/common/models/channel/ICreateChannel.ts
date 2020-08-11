import { ChatType } from "common/enums/ChatType";

export interface ICreateChannel {
  name: string;
  description?: string;
  type: ChatType;
  isPrivate: boolean;
  workspaceName: string;
}
