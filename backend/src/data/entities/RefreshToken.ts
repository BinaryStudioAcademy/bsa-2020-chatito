import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';

@Entity()
export class RefreshToken extends AbstractEntity {
  @Column()
  expiresAt: number;

  @Column()
  userId: string;
}
