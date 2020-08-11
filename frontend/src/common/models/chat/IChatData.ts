import { ChatType } from "common/enums/ChatType";

export interface IChatData {
  name: string;
  type: ChatType;
  isPrivate: boolean;
  workspaceName: string;
}
