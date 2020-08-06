import { Entity, Column, ManyToMany, ManyToOne, OneToMany, RelationId, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class Workspace extends AbstractEntity {
  @Column({ length: 150 })
  name: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => Chat, chat => chat.workspace)
  chats: Chat[];

  @ManyToOne(() => User, user => user.workspacesCreated)
  @JoinColumn({ name: 'createdByUserIdWorkspace' })
  createdByUser: User;

  @ManyToMany(() => User, user => user.workspaces)
  users: User[];

  @RelationId((chat: Chat) => chat.workspace)
  readonly relatedWorkspaceId: string;
}
