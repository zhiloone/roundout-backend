import { Request } from 'express';
import { AuthenticatedUser } from './authenticatedUser.type';

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
