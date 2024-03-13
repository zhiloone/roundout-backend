import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { AthleteEntity } from './athlete.entity';
import { BaseDateEntity } from './baseDate.entity';

@Entity('users')
export class UserEntity extends BaseDateEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: string;

  @OneToOne(() => AthleteEntity, (athlete) => athlete.user)
  athlete: AthleteEntity;
}
