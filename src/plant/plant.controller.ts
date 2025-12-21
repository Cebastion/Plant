import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantDTO } from './DTO/plant.dto';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post('')
  saveDataPlant(@Body() plantDTO: PlantDTO) {
    return this.plantService.saveDataPlant(plantDTO);
  }

  @Get('')
  getDataPlant() {
    return this.plantService.getDataPlant();
  }
}
