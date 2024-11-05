import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
      origin: 'http://localhost:3000', // URL do cliente React
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
  })
  
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private logger : Logger = new Logger('ChatGateway')
  private clients: Map<string, string> = new Map(); // Armazenar clientId e nickname

  @SubscribeMessage('setNickname')
  handleSetNickname(client: Socket, nickname: string): void {
    this.clients.set(client.id, nickname); // Armazenar o nickname
    
  }


  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    const nickname = this.clients.get(client.id) || 'Anonymous'; // Pegar o nickname ou usar 'Anonymous'
    this.server.emit('msgToClient', payload, nickname); // Enviar a mensagem com o nickname
  }

  afterInit(server: Server) {
      this.logger.log('Init');
  }
  handleConnection(client: Socket) {
      this.logger.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
  }
}
