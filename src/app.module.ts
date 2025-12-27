import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantModule } from './plant/plant.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { SettingModule } from './setting/setting.module';
import { BridgeModule } from './bridge/bridge.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    PlantModule,
    ConfigModule,
    FirebaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SettingModule,
    BridgeModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
