import { ICreateChat } from "./ICreateChat";

export interface ICreateChatAndAddPost {
  chat: ICreateChat;
  text: string;
}
