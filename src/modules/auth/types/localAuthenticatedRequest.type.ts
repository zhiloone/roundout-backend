import { Request } from 'express';
import { UserEntity } from 'src/entities/user.entity';

export interface LocalAuthenticatedRequest extends Request {
  user: Omit<UserEntity, 'password'>;
}
