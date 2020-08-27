import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Workspace } from './Workspace';
import { Chat } from './Chat';
import { Post } from './Post';
import { Comment } from './Comment';
import { RefreshToken } from './RefreshToken';
import { PostReaction } from './PostReaction';
import { Reminder } from './Reminder';
import { DraftPost } from './DraftPost';
import { DraftComment } from './DraftComment';

@Entity()
export class User extends AbstractEntity {
  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100 })
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true, length: 300 })
  title: string;

  @Column({ nullable: true, length: 100 })
  status: string;

  @OneToMany(() => Post, post => post.createdByUser)
  posts: Post[];

  @OneToMany(() => Reminder, reminder => reminder.createdByUser)
  reminders: Reminder[];

  @OneToMany(() => DraftPost, draftPost => draftPost.createdByUser)
  draftPosts: DraftPost[];

  @OneToMany(() => RefreshToken, token => token.user, { onDelete: 'CASCADE' })
  refreshTokens: RefreshToken[];

  @OneToMany(() => Comment, comment => comment.createdByUser)
  comments: Comment[];

  @OneToMany(() => DraftComment, draftComment => draftComment.createdByUser)
  draftComments: DraftComment[];

  @OneToMany(() => Chat, chat => chat.createdByUser, { onDelete: 'SET NULL' })
  chatsCreated: Chat[];

  @OneToMany(() => Workspace, wp => wp.createdByUser)
  workspacesCreated: Workspace[];

  @OneToMany(() => PostReaction, postReaction => postReaction.user)
  postReactions: PostReaction[];

  @ManyToMany(() => Workspace, workspace => workspace.users)
  @JoinTable()
  workspaces: Workspace[];

  @ManyToMany(() => Chat, chat => chat.users)
  @JoinTable()
  chats: Chat[];

  @ManyToMany(() => Post, post => post.unreadByUsers)
  @JoinTable()
  unreadPosts: Post[];
}
