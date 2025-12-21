import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';
import * as path from 'path';

const firebaseProvider = {
  provide: 'Firebase',
  useFactory: () => {
    return admin.initializeApp({
      credential: admin.credential.cert(path.resolve('key', 'firebase.json')),
    });
  },
};

@Module({
  imports: [],
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
