import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CompetitionEntity } from './competition.entity';
import { FileEntity } from './file.entity';
import { TeamEntity } from './team.entity';

// TODO: mover p/ um arquivo de enums
export enum RegistrationStatus {
  PENDING = 'Pendente',
  APPROVED = 'Aprovada',
  REJECTED = 'Rejeitada',
}

@Entity('registrations')
export class RegistrationEntity extends BaseEntity {
  @Column({ type: 'text', default: RegistrationStatus.PENDING })
  status: RegistrationStatus;

  @Column({ nullable: true, name: 'rejection_reason' })
  rejectionReason: string;

  @Column()
  teamId: string;
  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'teamId' })
  team: TeamEntity;

  @Column()
  competitionId: string;
  @ManyToOne(() => CompetitionEntity)
  @JoinColumn({ name: 'competitionId' })
  competition: CompetitionEntity;

  @OneToMany(() => FileEntity, (file) => file.registration, {
    cascade: true,
  })
  paymentReceipts: FileEntity[];
}
