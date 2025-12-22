import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { BridgeService } from './bridge.service';
import { PlantDTO } from 'src/plant/DTO/plant.dto';

@WebSocketGateway({
  namespace: 'bridge',
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class BridgeGateway {
  constructor(private readonly bridgeService: BridgeService) {}

  @SubscribeMessage('plant')
  GivePlantData(plantDto: PlantDTO) {
    this.bridgeService.GivePlantData(plantDto);
  }
}
