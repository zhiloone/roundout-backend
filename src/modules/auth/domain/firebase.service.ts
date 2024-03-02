import { Injectable, Logger, NotImplementedException } from '@nestjs/common';

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

  async createToken(uid: string, additionalClaims = {}) {
    this.logger.debug(`Creating a custom token for user #${uid}...`);
    return await this.auth.createCustomToken(uid, additionalClaims);
  }

  async validateToken(token: string) {
    this.logger.debug(`Validating token...`);
    return await this.auth.verifyIdToken(token);
  }

  // TODO: https://firebase.google.com/docs/auth/admin/email-action-links#generate_password_reset_email_link
  async resetPassword(email: string) {
    this.logger.debug(
      `Sending reset password instructions to email ${email}...`,
    );
    // const link = await this.auth.generatePasswordResetLink(email);

    throw new NotImplementedException('Funcionalidade não implementada.');
  }
}
