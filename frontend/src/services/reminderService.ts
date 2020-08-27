import api from 'common/helpers/apiHelper';
import { ICreateReminder } from 'common/models/reminder/ICreateReminder';
import { IReminder } from 'common/models/reminder/IReminder';
import { fromDateToReminderData } from '../containers/CustomReminderModal/index';

export async function addReminder({ chatId, day, time, note }: ICreateReminder) {
  const response: IReminder = await api.post(`/api/chats/${chatId}/reminders`, { day, time, note });
  const { chatId: reminderChatId, note: reminderNote } = response;
  let { date: reminderDate } = response;
  reminderDate = new Date(reminderDate);
  const { day: reminderDay, time: reminderTime } = fromDateToReminderData(reminderDate);
  return {
    chatId: reminderChatId,
    day: reminderDay,
    time: reminderTime,
    note: reminderNote
  };
}
