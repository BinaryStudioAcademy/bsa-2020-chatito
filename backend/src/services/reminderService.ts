import { getCustomRepository } from 'typeorm';
import { IReminder } from '../common/models/reminder/IReminder';
import ReminderRepository from '../data/repositories/reminderRepository';
import { ICreateReminder } from '../common/models/reminder/ICreateReminder';
import ChatRepository from '../data/repositories/chatRepository';
import UserRepository from '../data/repositories/userRepository';
import { ICreateReminderData } from '../common/models/reminder/ICreateReminderData';

export const addReminder = async ({ chatId, userId, body }: ICreateReminderData) => {
  const { day, time, note } = body;
  const chat = await getCustomRepository(ChatRepository).getById(chatId);
  const user = await getCustomRepository(UserRepository).getById(userId);
  const date = new Date(`${day} ${time}`);
  const createdReminder: ICreateReminder = { chat, createdByUser: user, date, note };
  const reminder: IReminder = await getCustomRepository(ReminderRepository).addReminder(createdReminder);
  return reminder;
};
