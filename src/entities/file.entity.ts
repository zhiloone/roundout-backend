import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RegistrationEntity } from './registration.entity';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column()
  path: string;

  @Column()
  type: string;

  @Column({ name: 'original_name' })
  originalName: string;

  @Column({ name: 'saved_name' })
  savedName: string;

  @Column({ nullable: true, name: 'registration_id' })
  registrationId: number;

  @ManyToOne(
    () => RegistrationEntity,
    (registration) => registration.paymentReceipts,
  )
  @JoinColumn({ name: 'registrationId' })
  registration: RegistrationEntity;
}
