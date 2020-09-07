export interface IBrowserChannel {
  id: string;
  hash: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  users: Array<{ id: string }>
  createdAt: string;
}
