import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';

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
}
