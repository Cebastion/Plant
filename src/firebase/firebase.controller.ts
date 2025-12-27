import { Body, Controller, Get, Post } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { PlantDTO } from 'src/plant/DTO/plant.dto';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly rtdb: FirebaseService) {}

  @Post()
  async update(@Body() body: PlantDTO) {
    await this.rtdb.updateValue('status/current', {
      ...body,
      timestamp: Date.now(),
    });
    return { ok: true };
  }

  @Get()
  async get() {
    return await this.rtdb.getValue('status/current');
  }
}
