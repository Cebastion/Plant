import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Expo from 'expo-server-sdk';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class NotificationService {
  private expo = new Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN,
    useFcmV1: true,
  });

  constructor(readonly FirebaseService: FirebaseService) {}

  async SaveAccessNotificationToken(access: boolean) {
    this.FirebaseService.setCollection('tokenDevice');
    await this.FirebaseService.db
      .collection('accessNotification')
      .doc('access')
      .set({ access: access });
    return access;
  }

  async getAccessNotificationToken() {
    this.FirebaseService.setCollection('tokenDevice');
    return this.FirebaseService.db
      .collection('accessNotification')
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          return doc.data().access;
        });
      });
  }

  async SaveTokenDevice(token: string) {
    this.FirebaseService.setCollection('tokenDevice');
    await this.FirebaseService.db
      .collection('tokenDevice')
      .doc('token')
      .set({ token: token });
    return token;
  }

  private async getTokens() {
    this.FirebaseService.setCollection('tokenDevice');
    return this.FirebaseService.db
      .collection('tokenDevice')
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          return doc.data().token;
        });
      });
  }

  async SendMessage(messagebody: string) {
    try {
      const data = await this.getTokens();
      const message = {
        to: data[0].token,
        sound: 'default',
        body: messagebody,
        data: { withSome: 'data' },
      };
      const chuncks = this.expo.chunkPushNotifications([message]);
      const tickets = [];
      const ticketChunk = await this.expo.sendPushNotificationsAsync(
        chuncks[0],
      );
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
