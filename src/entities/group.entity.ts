import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TeamEntity } from './team.entity';

@Entity('groups')
export class GroupEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({
    comment: 'Utilizado p/ determinar a ordem de grupos no seeding de equipes.',
  })
  index: number;

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

  @ManyToMany(() => TeamEntity)
  @JoinTable({
    name: 'groups_winning_teams',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  winningTeams: TeamEntity[];
}
