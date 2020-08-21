import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
  Unique
} from 'typeorm';
import { User } from './User';
import { Chat } from './Chat';
import { AbstractEntity } from '../abstract/AbstractEntity';

@Entity()
@Unique(['createdByUser', 'chat'])
export class DraftPost extends AbstractEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, user => user.draftPosts, { nullable: false })
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @RelationId((draftPost: DraftPost) => draftPost.createdByUser)
  readonly createdByUserId: string;

  @ManyToOne(() => Chat, chat => chat.draftPosts, { nullable: false })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @RelationId((draftPost: DraftPost) => draftPost.chat)
  readonly chatId: string;
}
