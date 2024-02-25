import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';

export abstract class BaseEntity extends BaseDateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
