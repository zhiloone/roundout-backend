import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

export enum MatchConfigurationType {
  ROUND_ROBIN = 'Fase de grupos',
  KNOCK_OUT_SINGLES = 'Mata-matas',
  // KNOCK_OUT_DOUBLES = 'Mata-matas (2 jogos garantidos)',
}

@Entity('configuration_matches')
export class MatchConfigurationEntity extends BaseEntity {
  @Column({ name: 'teams_count' })
  teamsCount: number;

  @Column({ type: 'text' })
  type: MatchConfigurationType;

  @Column({ type: 'json' })
  configuration: MatchConfiguration;
}

type MatchType = {
  teamOne: number;
  teamTwo: number;
  winningTeam: 'one' | 'two';
};

type MatchConfiguration = {
  match: MatchType | null;
  precedingMatches: [MatchConfiguration, MatchConfiguration];
};
