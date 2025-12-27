import { Injectable } from '@nestjs/common';
import { PlantDTO } from './DTO/plant.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PlantConfigDTO } from './DTO/plantConfig.dto';

@Injectable()
export class PlantService {
  constructor(readonly firebaseService: FirebaseService) { }

  async saveDataPlant(plantDTO: PlantDTO) {
    this.firebaseService.updateValue('status/current', plantDTO);
    return plantDTO;
  }

  async getDataPlant() {
    return await this.firebaseService.getValue('status/current');
  }

  async SaveConfigPlant(plantConfigDTO: PlantConfigDTO) {
    this.firebaseService.setCollection('plantConfig');
    await this.firebaseService.db
      .collection('plantConfig')
      .doc('config')
      .set(plantConfigDTO);
    return plantConfigDTO;
  }

  async getConfigPlant() {
    this.firebaseService.setCollection('plantConfig');
    return await this.firebaseService.db
      .collection('plantConfig')
      .doc('config')
      .get();
  }
}
