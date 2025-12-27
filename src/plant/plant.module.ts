import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [FirebaseModule, NotificationModule],
  controllers: [PlantController],
  providers: [PlantService],
})
export class PlantModule {}
