// src/bridge/bridge.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { BridgeService } from './bridge.service';
import { PlantDTO } from '../plant/DTO/plant.dto';

@WebSocketGateway({ path: 'bridge', cors: { origin: '*' } })
export class BridgeGateway {
  constructor(private readonly bridgeService: BridgeService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: WebSocket) {
    console.log('ESP connected');
  }

  @SubscribeMessage('plantData')
  async handlePlantData(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() data: PlantDTO, // plain object сразу
  ) {
    try {
      console.log('Temperature:', data.temperature);
      console.log('Humidity:', data.humidity);
      console.log('Light:', data.light);
      console.log('Soil:', data.soil);

      await this.bridgeService.givePlantData(data);
    } catch (err) {
      console.error('Ошибка при обработке данных:', err);
    }
  }
}
