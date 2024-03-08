import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MatchEntity } from './match.entity';

export enum WinningTeam {
  TEAM_ONE = 'Time 1',
  TEAM_TWO = 'Time 2',
}

@Entity('games')
export class GameEntity extends BaseEntity {
  @Column({ nullable: true, name: 'match_id' })
  matchId: number;
  @ManyToOne(() => MatchEntity)
  @JoinColumn({ name: 'matchId' })
  match: MatchEntity;

  @Column({ name: 'team_one_score' })
  teamOneScore: number;

  @Column({ name: 'team_two_score' })
  teamTwoScore: number;

  @Column({ type: 'text', name: 'winning_team' })
  winningTeam: WinningTeam;
}
