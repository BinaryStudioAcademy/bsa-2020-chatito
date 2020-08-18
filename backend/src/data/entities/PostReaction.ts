import { Entity, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class PostReaction extends AbstractEntity {
  @Column()
  reaction: string;

  @ManyToOne(() => Post, post => post.postReactions)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @RelationId((postReaction: PostReaction) => postReaction.post)
  readonly postId: string;

  @ManyToOne(() => User, user => user.postReactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @RelationId((postReaction: PostReaction) => postReaction.user)
  readonly userId: string;
}
