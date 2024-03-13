import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AthleteEntity } from './athlete.entity';
import { BaseEntity } from './base.entity';
import { MatchEntity } from './match.entity';

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

  @ManyToMany(() => AthleteEntity, (athlete) => athlete.teams)
  @JoinTable({
    name: 'teams_users',
    joinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'athlete_id',
      referencedColumnName: 'id',
    },
  })
  athletes: AthleteEntity[];

  @OneToMany(() => MatchEntity, (match) => match.winningTeam, {
    cascade: true,
  })
  matchesWon: MatchEntity[];
}
