export interface ICreateComment {
  post: { id: string };
  text: string;
  createdByUser: { id: string };
}
