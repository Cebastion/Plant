import { Module } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { BridgeGateway } from './bridge.gateway';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [BridgeGateway, BridgeService],
})
export class BridgeModule {}
