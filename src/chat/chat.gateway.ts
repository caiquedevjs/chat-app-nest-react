import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
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
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');
    private clients: Map<string, { nickname: string; image: string }> = new Map(); // Armazenar clientId, nickname e imagem

    @SubscribeMessage('setNickname')
    handleSetNickname(client: Socket, { nickname, image }: { nickname: string; image: string }): void {
        this.clients.set(client.id, { nickname, image }); // Armazenar nickname e imagem
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, { msg, image }: { msg: string; image: string }): void {
        const sender = this.clients.get(client.id) || { nickname: 'Anonymous', image: '' };
        this.server.emit('msgToClient', {
            msg,
            senderNickname: sender.nickname,
            senderImage: sender.image,
        });
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.clients.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }
}
