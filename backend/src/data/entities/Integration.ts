import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './Post';

@Entity()
export class Integration extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Post, post => post.integration)
  posts: Post[];
}
