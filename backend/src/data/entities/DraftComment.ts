import { Entity, Column, ManyToOne, JoinColumn, RelationId, Unique } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Post } from './Post';

@Entity()
@Unique(['createdByUser', 'post'])
export class DraftComment extends AbstractEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, user => user.draftComments, { nullable: false })
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @RelationId((draftComment: DraftComment) => draftComment.createdByUser)
  readonly createdByUserId: string;

  @ManyToOne(() => Post, post => post.draftComments, { nullable: false })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @RelationId((draftComment: DraftComment) => draftComment.post)
  readonly postId: string;
}
