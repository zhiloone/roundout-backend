import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';
import { TeamEntity } from './team.entity';

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

  @ManyToMany(() => TeamEntity, (team) => team.users)
  teams: TeamEntity[];
}
