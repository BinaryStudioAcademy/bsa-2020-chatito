import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Comment extends AbstractEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'createdByUserIdComment' })
  createdByUser: User;

  @ManyToOne(() => Post, post => post.comments)
  @JoinColumn({ name: 'relaterPost' })
  post: Post;
}
