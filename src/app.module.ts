import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantModule } from './plant/plant.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { SettingModule } from './setting/setting.module';
import { NotificationModule } from './notification/notification.module';
import { PlantNetModule } from './plant_net/plant_net.module';

@Module({
  imports: [
    PlantModule,
    ConfigModule,
    FirebaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SettingModule,
    NotificationModule,
    PlantNetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
