import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { IntegrationName } from '../../common/enums/IntegrationName';
import { Post } from './Post';

@Entity()
export class Integration extends AbstractEntity {
  @Column()
  name: IntegrationName;

  @OneToMany(() => Post, post => post.integration)
  posts: Post[];
}
