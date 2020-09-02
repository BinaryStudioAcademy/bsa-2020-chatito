export interface IBrowserChat {
  id: string;
  hash: string;
  name: string;
  isPrivate: boolean;
  users: Array<{ id: string }>
}
