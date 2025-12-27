import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  db: FirebaseFirestore.Firestore;
  collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('Firebase') private firebaseApp: app.App) {
    this.db = this.firebaseApp.firestore();
  }

  private rdb() {
    return this.firebaseApp.database();
  }

  async setValue(path: string, value: any) {
    await this.rdb().ref(path).set(value);
  }

  async getValue(path: string) {
    const snap = await this.rdb().ref(path).get();
    return snap.val();
  }

  async updateValue(path: string, value: any) {
    await this.rdb().ref(path).update(value);
  }

  setCollection(collectionName: 'setting' | 'plantConfig' | 'tokenDevice') {
    this.collection = this.db.collection(collectionName);
  }
}
