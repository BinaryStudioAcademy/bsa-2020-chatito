import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './PostEntity';
import { User } from './UserEntity';
import { Workspace } from './WorkspaceEntity';

@Entity()
export class Chat extends AbstractEntity {
  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, length: 100 })
  type: string;

  @Column({ nullable: false })
  isPrivate: boolean;

  @OneToMany(() => Post, post => post.chatId)
  posts: Post[];

  @OneToOne(() => User)
  @JoinTable()
  createdByUserId: User;

  @ManyToMany(() => User, user => user.chats)
  users: User[];

  @ManyToOne(() => Workspace, wp => wp.chats)
  workspaceId: Workspace;
}
