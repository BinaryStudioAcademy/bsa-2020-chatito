import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Workspace } from './Workspace';

@Entity()
export class User extends AbstractEntity {
  @Column({ nullable: false, length: 100 }) // nullable: false is default value, unnecessary (gooogle)
  fullName: string;

  @Column({ nullable: false, length: 100 })
  displayName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true, length: 300 })
  title: string;

  @OneToMany(() => Workspace, workspace => workspace.createdByUser)
  workspacesCreatedByUser: Workspace[];

  @ManyToMany(() => Workspace, workspace => workspace.members)
  @JoinTable({ name: 'users_workspaces' })
  workspaces: Workspace[];
}
