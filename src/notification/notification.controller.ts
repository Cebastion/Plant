import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('')
  sendMessage() {
    return this.notificationService.SendMessage('test message');
  }

  @Post('saveTokenDevice')
  saveTokenDevice(@Body() token: string) {
    return this.notificationService.SaveTokenDevice(token);
  }
}
