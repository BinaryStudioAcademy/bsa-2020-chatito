import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './PostEntity';
import { Comment } from './CommentEntity';
import { Chat } from './ChatEntity';
import { Workspace } from './WorkspaceEntity';

@Entity()
export class User extends AbstractEntity {
  @Column({ nullable: false, length: 100 })
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

  @OneToMany(() => Post, post => post.createdByUserId)
  posts: Post[];

  @OneToMany(() => Workspace, wp => wp.createdByUserId)
  workspaces: Workspace[];

  @OneToMany(() => Comment, comment => comment.createdByUserId)
  comments: Comment[];

  @ManyToMany(() => Chat, chat => chat.users)
  @JoinTable()
  chats: Chat[];
}
