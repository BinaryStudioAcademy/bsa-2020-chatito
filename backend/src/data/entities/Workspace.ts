import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';

@Entity()
export class Workspace extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  userId: string;
}
