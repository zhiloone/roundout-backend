import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { GameEntity } from './game.entity';
import { GroupEntity } from './group.entity';
import { TeamEntity } from './team.entity';

export enum MatchPhase {
  FINALS = 'Final',
  SEMI_FINALS = 'Semifinal',
  QUARTER_FINALS = 'Quartas de final',
  ROUND_OT_SIXTEEN = 'Oitavas de final',
  ROUND_ROBIN = 'Fase de grupos',
}

export const MatchPhaseIndex: { [key in MatchPhase]: number } = {
  [MatchPhase.FINALS]: 4,
  [MatchPhase.SEMI_FINALS]: 3,
  [MatchPhase.QUARTER_FINALS]: 2,
  [MatchPhase.ROUND_OT_SIXTEEN]: 1,
  [MatchPhase.ROUND_ROBIN]: 0,
};

@Entity('matches')
export class MatchEntity extends BaseEntity {
  @Column({ name: 'best_of' })
  bestOf: number;

  @Column({ nullable: true, name: 'group_id' })
  groupId: number;
  @ManyToOne(() => GroupEntity)
  @JoinColumn({ name: 'groupId' })
  group: GroupEntity;

  @Column({ type: 'text' })
  phase: MatchPhase;

  @Column({
    comment: 'Utilizado p/ determinar a ordem das partidas em uma competição.',
    name: 'phase_index',
  })
  phaseIndex: number;

  @Column({ nullable: true, name: 'team_one_id' })
  teamOneId: number;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'teamOneId' })
  teamOne: TeamEntity;

  @Column({ nullable: true, name: 'team_two_id' })
  teamTwoId: number;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'teamTwoId' })
  teamTwo: TeamEntity;

  @Column({ nullable: true, name: 'winning_team_id' })
  winningTeamId: number;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'winningTeamId' })
  winningTeam: TeamEntity;

  @OneToMany(() => GameEntity, (game) => game.match)
  games: GameEntity[];
}
