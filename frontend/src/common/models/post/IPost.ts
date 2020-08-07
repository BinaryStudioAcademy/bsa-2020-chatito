import { IUser } from "../user/user";

export interface IPost {
  id: string;
  chatId: string;
  // isPinned: boolean; // ?
  createdByUser: IUser;
  createdByUserId: string;
  latestReply: string | undefined;
  text: string;
  // attachments: undefined;
  // type: string; // text or image or something else, maybe create attachments table with links in DB...
  createdAt: string;
  updatedAt: string | undefined;
  repliesIDs: string[] | undefined; // comments
  replyCount: number | null;
  replyUsersIDs: string[] | undefined;
  replyUsersCount: number | null;
  // add reactions?
}
