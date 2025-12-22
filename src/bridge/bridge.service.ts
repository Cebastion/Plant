import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PlantDTO } from 'src/plant/DTO/plant.dto';

@Injectable()
export class BridgeService {
  constructor(readonly firebaseService: FirebaseService) {
    firebaseService.setCollection('plant');
  }
  async GivePlantData(plantDto: PlantDTO) {
    await this.firebaseService.collection.doc('plant').set(plantDto);
    return plantDto;
  }
}
