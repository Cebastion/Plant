import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  db: FirebaseFirestore.Firestore;
  collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('Firebase') private firebaseApp: app.App) {
    this.db = this.firebaseApp.firestore();
    this.collection = this.db.collection('plant');
  }
}
