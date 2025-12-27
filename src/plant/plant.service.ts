import { Injectable } from '@nestjs/common';
import { PlantDTO } from './DTO/plant.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class PlantService {
  constructor(readonly firebaseService: FirebaseService) {
    firebaseService.setCollection('plant');
  }

  async saveDataPlant(plantDTO: PlantDTO) {
    this.firebaseService.updateValue('status/current', plantDTO);
    return plantDTO;
  }

  async getDataPlant() {
    return await this.firebaseService.getValue('status/current');
  }
}
