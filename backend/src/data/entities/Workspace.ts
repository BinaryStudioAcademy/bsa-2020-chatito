import { Entity, Column, ManyToMany, ManyToOne, OneToMany, RelationId, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class Workspace extends AbstractEntity {
  @Column({ unique: true, length: 150 })
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ unique: true, length: 7 })
  hash: string;

  @OneToMany(() => Chat, chat => chat.workspace)
  chats: Chat[];

  @ManyToOne(() => User, user => user.workspacesCreated)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @RelationId((workspace: Workspace) => workspace.createdByUser)
  readonly createdByUserId: string;

  @ManyToMany(() => User, user => user.workspaces)
  users: User[];
}
