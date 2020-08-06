import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Comment extends AbstractEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, user => user.comments)
  createdByUserId: User;

  @ManyToOne(() => Post, post => post.comments)
  postId: Post;
}
