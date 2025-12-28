import { Module } from '@nestjs/common';
import { PlantNetService } from './plant_net.service';
import { PlantNetController } from './plant_net.controller';

@Module({
  controllers: [PlantNetController],
  providers: [PlantNetService],
})
export class PlantNetModule {}
