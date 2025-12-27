import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Expo from 'expo-server-sdk';

@Injectable()
export class NotificationService {
  private expo = new Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN,
    useFcmV1: true,
  });

  async SendMessage() {
    try {
      const message = {
        to: 'ExponentPushToken[Arwx0YOKEOpclgJnPFCi8k]',
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
