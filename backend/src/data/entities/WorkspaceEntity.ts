import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './UserEntity';
import { Chat } from './ChatEntity';

@Entity()
export class Workspace extends AbstractEntity {
  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, length: 400 })
  imageUrl: string;

  @ManyToOne(() => User, user => user.workspaces)
  createdByUserId: User;

  @OneToMany(() => Chat, chat => chat.workspaceId)
  chats: Chat[];
}
