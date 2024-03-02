import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export interface FirebaseAuthenticatedRequest extends Request {
  user: DecodedIdToken;
}
