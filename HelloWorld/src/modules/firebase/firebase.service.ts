import { Injectable } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';
import { ENV } from '../../shared/constants';

@Injectable()
export class FirebaseService {
  public firebase: FirebaseAdmin.app.App;
  constructor() {
    const firebaseCredentials: FirebaseAdmin.ServiceAccount = {
      projectId: ENV.FIREBASE_PROJECT_ID,
      privateKey: ENV.FIREBASE_PRIVATE_KEY,
      clientEmail: ENV.FIREBASE_CLIENT_EMAIL,
    };

    this.firebase = FirebaseAdmin.initializeApp({
      credential: FirebaseAdmin.credential.cert(firebaseCredentials),
      projectId: firebaseCredentials.projectId,
    });
  }
}
