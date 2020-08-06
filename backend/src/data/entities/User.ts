import { Entity, Column, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Workspace } from './Workspace';
import { Chat } from './Chat';
import { Post } from './Post';
import { Comment } from './Comment';
import { RefreshToken } from './RefreshToken';

@Entity()
export class User extends AbstractEntity {
  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100 })
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true, length: 300 })
  title: string;

  @OneToOne(() => RefreshToken)
  @JoinTable()
  refreshToken: RefreshToken

  @OneToMany(() => Post, post => post.createdByUserId)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.createdByUserId)
  comments: Comment[];

  @OneToMany(() => Chat, chat => chat.createdByUserId)
  chatsCreated: Chat[];

  @OneToMany(() => Workspace, wp => wp.createdByUserId)
  workspacesCreated: Workspace[];

  @ManyToMany(() => Workspace, workspace => workspace.members)
  @JoinTable()
  workspaces: Workspace[];

  @ManyToMany(() => Chat, chat => chat.members)
  @JoinTable()
  chats: Chat[];
}
