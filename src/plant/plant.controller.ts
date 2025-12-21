import { Body, Controller, Get } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantDTO } from './DTO/plant.dto';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get('')
  getDataPlant(@Body() plantDTO: PlantDTO) {
    return this.plantService.getDataPlant(plantDTO);
  }
}
