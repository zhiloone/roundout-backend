import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

export enum TeamFormat {
  SINGLES = 'Individual',
  DOUBLES = 'Dupla',
}

@Entity('teams')
export class TeamEntity extends BaseEntity {
  @Column()
  size: number;

  @Column({ type: 'text', name: 'team_format' })
  teamFormat: TeamFormat;

  @ManyToMany(() => UserEntity, (user) => user.teams)
  @JoinTable({
    name: 'teams_users',
    joinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];
}
