import { Entity, Column, ManyToOne, ManyToMany, OneToMany, JoinColumn, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Chat } from './Chat';
import { Comment } from './Comment';
import { PostReaction } from './PostReaction';
import { DraftComment } from './DraftComment';
import { IntegrationType } from '../../common/enums/IntegrationType';

@Entity()
export class Post extends AbstractEntity {
  @Column()
  text: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'enum', enum: IntegrationType, default: IntegrationType.None })
  integration: IntegrationType;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => DraftComment, draftComment => draftComment.post)
  draftComments: DraftComment[];

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @RelationId((post: Post) => post.createdByUser)
  readonly createdByUserId: string;

  @ManyToOne(() => Chat, chat => chat.posts)
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @RelationId((post: Post) => post.chat)
  readonly chatId: string;

  @OneToMany(() => PostReaction, postReaction => postReaction.post)
  postReactions: PostReaction[];

  @ManyToMany(() => User, user => user.unreadPosts)
  unreadByUsers: User[];
}
