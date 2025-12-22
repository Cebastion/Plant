import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'http';
import { PlantDTO } from 'src/plant/DTO/plant.dto';
import { BridgeService } from './bridge.service';
import { plainToInstance } from 'class-transformer';

@WebSocketGateway({ path: '/bridge' })
export class BridgeGateway {
  constructor(private readonly bridgeService: BridgeService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: WebSocket) {
    console.log('ESP connected');
  }

  @SubscribeMessage('plantData') // имя события
  handleMessage(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() data: any,
  ) {
    // Преобразуем plain object в PlantDTO
    const plant: PlantDTO = plainToInstance(PlantDTO, JSON.parse(data));

    console.log(plant.temperature);
    console.log(plant.humidity);

    // Можно передавать дальше в сервис
    this.bridgeService.GivePlantData(plant);
  }
}
