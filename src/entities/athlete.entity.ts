import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TeamEntity } from './team.entity';
import { UserEntity } from './user.entity';

@Entity('athletes')
export class AthleteEntity extends BaseEntity {
  @Column()
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.athlete)
  // TODO: test this: https://github.com/typeorm/typeorm/pull/8616
  // Objetivo: usar a FK de usuário como PK aqui
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ default: 0 })
  score: number;

  @ManyToMany(() => TeamEntity, (team) => team.athletes)
  teams: TeamEntity[];
}
