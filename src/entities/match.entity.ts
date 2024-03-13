import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { GameEntity } from './game.entity';
import { GroupEntity } from './group.entity';
import { TeamEntity } from './team.entity';

@Entity('matches')
export class MatchEntity extends BaseEntity {
  @Column({ name: 'best_of' })
  bestOf: number;

  @Column({ nullable: true })
  groupId: string;
  @ManyToOne(() => GroupEntity)
  @JoinColumn({ name: 'groupId' })
  group: GroupEntity;

  @Column({
    comment: 'Utilizado p/ determinar a ordem das partidas em uma competição.',
    name: 'phase_index',
  })
  phaseIndex: number;

  @Column()
  teamOneId: string;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'teamOneId' })
  teamOne: TeamEntity;

  @Column()
  teamTwoId: string;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'teamTwoId' })
  teamTwo: TeamEntity;

  @Column({ nullable: true, name: 'winning_team_id' })
  winningTeamId: string;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'winningTeamId' })
  winningTeam: TeamEntity;

  @OneToMany(() => GameEntity, (game) => game.match)
  games: GameEntity[];
}
