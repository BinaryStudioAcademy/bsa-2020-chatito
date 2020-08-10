import { ChatType } from '../../enums/ChatType';

export interface IChatData {
  name: string;
  type: ChatType;
  isPrivate: boolean;
  workspaceName: string;
  createdByUserId: string;
}
