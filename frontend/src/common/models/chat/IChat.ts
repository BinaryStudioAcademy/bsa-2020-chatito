import { ChatType } from '../../enums/ChatType';

export interface IChat {
  id: string;
  name: string;
  isPrivate: boolean;
  type: ChatType;
}
