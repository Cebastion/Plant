import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingDto } from './DTO/setting.dto';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('')
  async getSetting() {
    return this.settingService.getSetting();
  }

  @Post('')
  async saveSetting(@Body() settingDTO: SettingDto[]) {
    console.log(settingDTO);
    return this.settingService.saveSetting(settingDTO);
  }
}
