export interface IDraftPostClient {
  id: string;
  text: string;
  chat?: {
    hash?: string;
    name?: string;
  }
}
