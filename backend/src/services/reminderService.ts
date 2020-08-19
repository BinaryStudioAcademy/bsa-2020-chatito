import { IReminder } from '../common/models/reminder/IReminder';

export const addReminder = async (chatId: string, body: IReminder) => {
  const reminder: IReminder = await getCustomRepository(ReminderRepository).addReminder(body);
  return reminder;
}
