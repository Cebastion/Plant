import { Injectable } from '@nestjs/common';
import { PlantDTO } from './DTO/plant.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PlantConfigDTO } from './DTO/plantConfig.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class PlantService {
  private notified: Record<string, boolean> = {
    temperature_high: false,
    temperature_low: false,
    humidity_high: false,
    humidity_low: false,
    light_high: false,
    light_low: false,
    soil_moisture_high: false,
    soil_moisture_low: false,
  };

  private lastNotification: Record<string, number> = {};

  private HYSTERESIS = 1; // запас для гистерезиса
  private COOLDOWN = 5 * 60 * 1000; // 5 минут

  constructor(
    readonly firebaseService: FirebaseService,
    readonly notificationService: NotificationService,
  ) {}

  async saveDataPlant(plantDTO: PlantDTO) {
    const config: PlantConfigDTO = await this.getConfigPlant();

    const values: Record<string, number> = {
      temperature: Number(plantDTO.temperature),
      humidity: Number(plantDTO.humidity),
      light: Number(plantDTO.light),
      soil_moisture: Number(plantDTO.soil),
    };

    const limits: Record<string, { min: number; max: number }> = {
      temperature: { min: config.min_temp, max: config.max_temp },
      humidity: { min: config.min_humidity, max: config.max_humidity },
      light: { min: config.min_light, max: config.max_light },
      soil_moisture: {
        min: config.min_soil_moisture,
        max: config.max_soil_moisture,
      },
    };

    const now = Date.now();

    for (const key of Object.keys(values)) {
      const value = values[key];
      const { min, max } = limits[key];

      // Верхний порог
      const highKey = `${key}_high`;
      if (value > max && !this.notified[highKey]) {
        if (
          !this.lastNotification[highKey] ||
          now - this.lastNotification[highKey] > this.COOLDOWN
        ) {
          this.notificationService.SendMessage(`${key} too high: ${value}`);
          this.notified[highKey] = true;
          this.lastNotification[highKey] = now;
        }
      } else if (value < max - this.HYSTERESIS && this.notified[highKey]) {
        this.notified[highKey] = false;
      }

      // Нижний порог
      const lowKey = `${key}_low`;
      if (value < min && !this.notified[lowKey]) {
        if (
          !this.lastNotification[lowKey] ||
          now - this.lastNotification[lowKey] > this.COOLDOWN
        ) {
          this.notificationService.SendMessage(`${key} too low: ${value}`);
          this.notified[lowKey] = true;
          this.lastNotification[lowKey] = now;
        }
      } else if (value > min + this.HYSTERESIS && this.notified[lowKey]) {
        this.notified[lowKey] = false;
      }
    }

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

  async getConfigPlant(): Promise<PlantConfigDTO> {
    this.firebaseService.setCollection('plantConfig');
    return (
      await this.firebaseService.db
        .collection('plantConfig')
        .doc('config')
        .get()
    ).data() as PlantConfigDTO;
  }
}
