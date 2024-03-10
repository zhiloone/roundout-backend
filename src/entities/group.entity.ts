import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { MatchConfigurationEntity } from './configuration/match.configuration.entity';
import { TeamEntity } from './team.entity';

// TODO: como/onde salvar quais equipes são vencedores da fase de grupos
@Entity('groups')
export class GroupEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({
    comment: 'Utilizado p/ determinar a ordem de grupos no seeding de equipes.',
  })
  index: number;

  @Column({ nullable: true, name: 'match_configuration_id' })
  matchConfigurationId: number;
  @ManyToOne(() => MatchConfigurationEntity)
  @JoinColumn({ name: 'matchConfigurationId' })
  matchConfiguration: MatchConfigurationEntity;

  @ManyToMany(() => TeamEntity)
  @JoinTable({
    name: 'groups_teams',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  teams: TeamEntity[];
}
