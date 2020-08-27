import { IReminderData } from './IReminderData';

export interface ICreateReminderData {
  userId: string;
  chatId: string;
  body: IReminderData;
}
