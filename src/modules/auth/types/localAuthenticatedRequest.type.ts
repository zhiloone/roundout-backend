import { Request } from 'express';
import { User } from 'src/entities/user.entity';

export interface LocalAuthenticatedRequest extends Request {
  user: Omit<User, 'password'>;
}
