import { Entity, Column, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './Post';
import { User } from './User';
import { Workspace } from './Workspace';
import { chatType } from '../../common/enums/chat';

@Entity()
export class Chat extends AbstractEntity {
  @Column({ length: 150 })
  name: string;

  @Column()
  type: chatType;

  @Column()
  isPrivate: boolean;

  @OneToMany(() => Post, post => post.chatId)
  posts: Post[];

  @ManyToOne(() => User, user => user.chatsCreated)
  createdByUserId: User;

  @ManyToMany(() => User, user => user.chats)
  members: User[];

  @ManyToOne(() => Workspace, wp => wp.chats)
  workspaceId: Workspace;
}
