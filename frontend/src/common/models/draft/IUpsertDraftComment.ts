export interface IUpsertDraftComment {
  id?: string;
  text: string;
  createdByUserId: string;
  postId: string;
}
