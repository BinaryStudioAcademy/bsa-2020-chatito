import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './PostEntity';

@Entity()
export class Chat extends AbstractEntity {
  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, length: 100 })
  type: string;

  @Column({ nullable: false })
  isPrivate: boolean;

  @OneToMany(() => Post, post => post.chatId)
  posts: Post[];

  // add workspace id

  // add createdBy user id
}
