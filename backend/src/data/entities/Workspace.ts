import { Entity, Column, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class Workspace extends AbstractEntity {
  @Column({ nullable: false, length: 150 })
  name: string;

  @Column({ nullable: false })
  imageUrl: string;

  @ManyToOne(() => User, user => user.workspacesCreated)
  createdByUserId: User;

  @ManyToMany(() => User, user => user.workspaces)
  members: User[];

  @OneToMany(() => Chat, chat => chat.workspaceId)
  chats: Chat[];
}
