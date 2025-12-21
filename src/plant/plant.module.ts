import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [PlantController],
  providers: [PlantService],
})
export class PlantModule {}
