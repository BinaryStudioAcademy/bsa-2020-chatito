import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './UserEntity';
import { Post } from './PostEntity';

@Entity()
export class Comment extends AbstractEntity {
  @Column({ nullable: false, length: 400 })
  text: string;

  @ManyToOne(() => User, user => user.comments)
  createdByUserId: User;

  @ManyToOne(() => Post, post => post.comments)
  postId: Post;
}
