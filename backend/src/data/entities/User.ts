import { Entity, Column, ManyToMany, JoinTable, OneToMany, OneToOne, RelationId } from 'typeorm';
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

  @OneToMany(() => Post, post => post.createdByUser)
  posts: Post[];

  @OneToMany(() => RefreshToken, token => token.user)
  refreshToken: RefreshToken[];

  @OneToMany(() => Comment, comment => comment.createdByUser)
  comments: Comment[];

  @OneToMany(() => Chat, chat => chat.createdByUser)
  chatsCreated: Chat[];

  @OneToMany(() => Workspace, wp => wp.createdByUser)
  workspacesCreated: Workspace[];

  @RelationId((chat: Chat) => chat.createdByUser)
  readonly createdByUserIdChat: string;

  @RelationId((workspace: Workspace) => workspace.createdByUser)
  readonly createdByUserIdWorkspace: string;

  @RelationId((post: Post) => post.createdByUser)
  readonly createdByUserIdPost: string;

  @RelationId((token: RefreshToken) => token.user)
  readonly tokerOwnerId: string;

  @RelationId((comment: Comment) => comment.createdByUser)
  readonly createdByUserIdComment: string;

  @ManyToMany(() => Workspace, workspace => workspace.users)
  @JoinTable()
  workspaces: Workspace[];

  @ManyToMany(() => Chat, chat => chat.users)
  @JoinTable()
  chats: Chat[];
}
