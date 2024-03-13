import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CompetitionEntity } from './competition.entity';
import { MatchEntity } from './match.entity';
import { TeamEntity } from './team.entity';

export enum DrawStatus {
  READY = 'Disponível',
  IN_PROGRESS = 'Em progresso',
  FINISHED = 'Finalizado',
}

export enum DrawPhase {
  FINALS = 'Final',
  SEMI_FINALS = 'Semifinal',
  QUARTER_FINALS = 'Quartas de final',
  ROUND_OT_SIXTEEN = 'Oitavas de final',
  ROUND_ROBIN = 'Fase de grupos',
}

export const DrawPhaseIndex: { [key in DrawPhase]: number } = {
  [DrawPhase.FINALS]: 4,
  [DrawPhase.SEMI_FINALS]: 3,
  [DrawPhase.QUARTER_FINALS]: 2,
  [DrawPhase.ROUND_OT_SIXTEEN]: 1,
  [DrawPhase.ROUND_ROBIN]: 0,
};

@Entity('draws')
export class DrawEntity extends BaseEntity {
  @Column({ nullable: true, name: 'left_bower' })
  leftBower: number;

  @Column({ nullable: true, name: 'right_bower' })
  rightBower: number;

  @Column({ type: 'text' })
  phase: DrawPhase;

  @Column({ default: false, name: 'is_bye' })
  isBye: boolean;

  @Column({ type: 'text' })
  status: DrawStatus;

  @Column()
  competitionId: string;
  @ManyToOne(() => CompetitionEntity)
  @JoinColumn({ name: 'competitionId' })
  competition: CompetitionEntity;

  @Column({ nullable: true })
  teamOneId: string;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'teamOneId' })
  teamOne: TeamEntity;

  @Column({ nullable: true })
  teamTwoId: string;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'teamTwoId' })
  teamTwo: TeamEntity;

  @Column({ nullable: true })
  winningTeamId: string;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'winningTeamId' })
  winningTeam: TeamEntity;

  @Column({ nullable: true })
  matchId: string;
  @ManyToOne(() => MatchEntity)
  @JoinColumn({ name: 'matchId' })
  match: MatchEntity;
}
