import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';

@Entity('users')
export class User extends BaseDateEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
