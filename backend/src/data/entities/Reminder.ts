import { Entity, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class Reminder extends AbstractEntity {
  @Column()
  date: Date;

  @Column()
  note: string;

  @ManyToOne(() => User, user => user.reminders)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @RelationId((reminder: Reminder) => reminder.createdByUser)
  readonly createdByUserId: string;

  @ManyToOne(() => Chat, chat => chat.reminders)
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @RelationId((reminder: Reminder) => reminder.chat)
  readonly chatId: string;
}
