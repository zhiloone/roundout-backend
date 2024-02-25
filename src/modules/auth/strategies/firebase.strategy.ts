import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-unique-token';
import { AuthErrors } from '../auth.errors';
import { FirebaseService } from '../domain/firebase.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  private logger = new Logger(FirebaseStrategy.name);

  constructor(private firebaseService: FirebaseService) {
    super({
      tokenQuery: 'Authorization',
      tokenParams: 'Authorization',
      tokenField: 'Authorization',
      tokenHeader: 'Authorization',
      failOnMissing: true,
    });
  }

  async validate(bearerToken: string) {
    this.logger.debug(`Validating user with FirebaseTokenStrategy...`);

    const token = (bearerToken || '').replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException(AuthErrors.INVALID_BEARER_TOKEN);
    }

    try {
      return await this.firebaseService.validateToken(token);
    } catch (error) {
      throw new UnauthorizedException(AuthErrors.UNAUTHORIZED);
    }
  }
}
