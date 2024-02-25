import { Injectable, Logger } from '@nestjs/common';

import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
import { Auth } from 'firebase-admin/lib/auth/auth';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private readonly auth: Auth;

  constructor() {
    this.auth = admin
      .initializeApp({
        credential: applicationDefault(),
      })
      .auth();
  }

  async createToken(uid: string) {
    this.logger.debug(`Creating a custom token...`);
    return await this.auth.createCustomToken(uid);
  }

  async validateToken(token: string) {
    this.logger.debug(`Validating token...`);
    return await this.auth.verifyIdToken(token);
  }
}
