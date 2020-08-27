import { EntityRepository, Repository } from 'typeorm';
import { ICreateReminder } from '../../common/models/reminder/ICreateReminder';
import { Reminder } from '../entities/Reminder';

@EntityRepository(Reminder)
class ReminderRepository extends Repository<Reminder> {
  addReminder(reminder: ICreateReminder): Promise<Reminder> {
    const newReminder = this.create(reminder);
    return newReminder.save();
  }
}

export default ReminderRepository;
