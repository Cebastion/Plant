import { Injectable } from '@nestjs/common';
import { PlantDTO } from './DTO/plant.dto';

@Injectable()
export class PlantService {
  async getDataPlant(plantDTO: PlantDTO) {
    return plantDTO;
  }
}
