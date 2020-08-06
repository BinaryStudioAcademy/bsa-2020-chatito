import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinColumn, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './Post';
import { User } from './User';
import { Workspace } from './Workspace';
import { ChatType } from '../../common/enums/chat';

@Entity()
export class Chat extends AbstractEntity {
  @Column({ length: 150 })
  name: string;

  @Column({ type: 'enum', enum: ChatType })
  type: ChatType;

  @Column()
  isPrivate: boolean;

  @OneToMany(() => Post, post => post.chat)
  posts: Post[];

  @ManyToOne(() => User, user => user.chatsCreated)
  @JoinColumn({ name: 'createdByUserIdChat' })
  createdByUser: User;

  @ManyToOne(() => Workspace, wp => wp.chats)
  @JoinColumn({ name: 'relatedWorkspaceId' })
  workspace: Workspace;

  @RelationId((post: Post) => post.chat)
  readonly relatedChat: string;

  @ManyToMany(() => User, user => user.chats)
  users: User[];
}
