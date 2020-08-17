import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinColumn, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './Post';
import { User } from './User';
import { Workspace } from './Workspace';
import { ChatType } from '../../common/enums/ChatType';
import { DraftPost } from './DraftPost';

@Entity()
export class Chat extends AbstractEntity {
  @Column({ length: 150 })
  name: string;

  @Column({ type: 'enum', enum: ChatType })
  type: ChatType;

  @Column({ unique: true, length: 7 })
  hash: string;

  @Column()
  isPrivate: boolean;

  @OneToMany(() => Post, post => post.chat)
  posts: Post[];

  @OneToMany(() => DraftPost, draftPost => draftPost.chat)
  draftPosts: DraftPost[];

  @ManyToOne(() => User, user => user.chatsCreated)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @RelationId((chat: Chat) => chat.createdByUser)
  readonly createdByUserId: string;

  @ManyToOne(() => Workspace, wp => wp.chats)
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;

  @RelationId((chat: Chat) => chat.workspace)
  readonly workspaceId: string;

  @ManyToMany(() => User, user => user.chats)
  users: User[];
}
