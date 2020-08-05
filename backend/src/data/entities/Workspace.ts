import { Entity, Column, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
@Entity()
export class Workspace extends AbstractEntity {
  @Column({ unique: true, length: 100 })
  name: string;

  @ManyToOne(() => User, user => user.workspacesCreatedByUser)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @Column()
  createdByUserId: string;

  @ManyToMany(() => User, user => user.workspaces)
  members: User[];
}
