import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PlantDTO } from 'src/plant/DTO/plant.dto';

@Injectable()
export class BridgeService {
  constructor(readonly firebaseService: FirebaseService) {
    firebaseService.setCollection('plant');
  }
  async givePlantData(plant: PlantDTO) {
    await this.firebaseService.collection.doc('plant').set(plant);
    return plant;
  }
}
