import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinColumn, RelationId, Unique } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './Post';
import { User } from './User';
import { Workspace } from './Workspace';
import { ChatType } from '../../common/enums/ChatType';
import { Reminder } from './Reminder';
import { DraftPost } from './DraftPost';

@Entity()
@Unique(['name', 'workspace'])
export class Chat extends AbstractEntity {
  @Column({ length: 150, nullable: true })
  name: string;

  @Column({ type: 'enum', enum: ChatType })
  type: ChatType;

  @Column({ length: 200, nullable: true })
  description: string;

  @Column({ unique: true, length: 7 })
  hash: string;

  @Column()
  isPrivate: boolean;

  @OneToMany(() => Post, post => post.chat)
  posts: Post[];

  @OneToMany(() => Reminder, reminder => reminder.chat)
  reminders: Reminder[];

  @OneToMany(() => DraftPost, draftPost => draftPost.chat)
  draftPosts: DraftPost[];

  @ManyToOne(() => User, user => user.chatsCreated)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @RelationId((chat: Chat) => chat.createdByUser)
  readonly createdByUserId: string;

  @ManyToOne(() => Workspace, wp => wp.chats)
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;

  @RelationId((chat: Chat) => chat.workspace)
  readonly workspaceId: string;

  @ManyToMany(() => User, user => user.chats)
  users: User[];

  @ManyToMany(() => User, user => user.mutedChats)
  mutedByUsers: User[];
}
