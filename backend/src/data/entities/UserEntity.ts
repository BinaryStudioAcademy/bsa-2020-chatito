import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './PostEntity';
import { Comment } from './CommentEntity';

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

  @OneToMany(() => Comment, comment => comment.createdByUserId)
  comments: Comment[];
}
