import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Expo from 'expo-server-sdk';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class NotificationService {
  private expo = new Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN,
    useFcmV1: true,
  });

  constructor(readonly FirebaseService: FirebaseService) { }

  async SaveTokenDevice(token: string) {
    this.FirebaseService.setCollection('tokenDevice');
    await this.FirebaseService.db
      .collection('tokenDevice')
      .doc(token)
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

  async SendMessage() {
    try {
      const message = {
        to: await this.getTokens(),
        sound: 'default',
        body: 'And here is the body!',
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
