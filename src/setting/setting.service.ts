import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SettingDto } from './DTO/setting.dto';

@Injectable()
export class SettingService {
  constructor(readonly firebaseService: FirebaseService) {
    firebaseService.setCollection('setting');
  }

  async saveSetting(settingDTO: SettingDto[]) {
    await this.firebaseService.collection.doc('setting').set(settingDTO);
  }

  async getSetting() {
    const snapshot = await this.firebaseService.collection.doc('setting').get();

    if (!snapshot.exists) {
      return null;
    }

    const data = snapshot.data();

    return {
      ...data,
      length: data.WiFis.length,
    };
  }
}
