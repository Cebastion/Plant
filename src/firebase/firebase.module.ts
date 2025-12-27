import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import * as admin from 'firebase-admin';

const firebaseProvider = {
  provide: 'Firebase',
  useFactory: () => {
    return admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        projectId: process.env.FIREBASE_PROJECT_ID,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  },
};

@Module({
  imports: [],
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
  controllers: [FirebaseController],
})
export class FirebaseModule {}
