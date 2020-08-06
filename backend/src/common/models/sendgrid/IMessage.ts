export interface IMessage {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}
