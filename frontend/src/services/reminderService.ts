import api from 'common/helpers/apiHelper';
import { ICreateReminder } from 'common/models/reminder/ICreateReminder';

export async function addReminder({ chatId, day, time, note }: ICreateReminder) {
  const response = await api.post(`/api/chats/${chatId}/reminders`, { day, time, note });
  return response;
}
