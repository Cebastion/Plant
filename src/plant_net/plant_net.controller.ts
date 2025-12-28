import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PlantNetService } from './plant_net.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('plant-net')
export class PlantNetController {
  constructor(private readonly plantNetService: PlantNetService) {}

  @Post('single-species-identification')
  @UseInterceptors(FileInterceptor('image'))
  async SingleSpeciesIdentification(@UploadedFile() file: Express.Multer.File) {
    return this.plantNetService.SingleSpeciesIdentification(file);
  }

  @Post('diseases-identification')
  @UseInterceptors(FileInterceptor('image'))
  async DiseasesIdentification(@UploadedFile() file: Express.Multer.File) {
    return this.plantNetService.DiseasesIdentification(file);
  }
  @Post('varieties-identification')
  @UseInterceptors(FileInterceptor('image'))
  async VarietiesIdentification(@UploadedFile() file: Express.Multer.File) {
    return this.plantNetService.VarietiesIdentification(file);
  }
}
