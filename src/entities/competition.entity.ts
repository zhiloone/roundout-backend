import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TeamFormat } from './team.entity';

export enum CompetitionType {
  CHAMPIONSHIP = 'Campeonato',
  SCRIMMAGE = 'Rachão',
}

@Entity('competitions')
export class CompetitionEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'money' })
  registrationPrice: number;

  @Column({ type: 'timestamptz', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamptz', name: 'end_date' })
  endDate: Date;

  @Column({ name: 'registration_limit' })
  registrationLimit: number;

  @Column({ type: 'text', name: 'competition_type' })
  competitionType: CompetitionType;

  @Column({ type: 'text', name: 'team_format' })
  teamFormat: TeamFormat;
}
