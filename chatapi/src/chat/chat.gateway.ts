/* eslint-disable prettier/prettier */
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
        origin: 'http://localhost:3000', // 💡 URL do cliente React
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');
    private clients: Map<string, {
        position: { lat: number; lng: number; }; nickname: string; image: string ,  colorNickname: string 
}> = new Map(); // Armazenar clientId, nickname e imagem

    @SubscribeMessage('setNickname')
    handleSetNickname(client: Socket, { nickname, image, colorNickname }: { nickname: string; image: string; colorNickname: string }): void {
        this.clients.set(client.id, {
            nickname, image, colorNickname,
            position: {
                lat: -23.55052,
                lng: -46.633308 
            }
        });
    }
    

    @SubscribeMessage('msgToServer')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleMessage(client: Socket, { msg, image }: { msg: string; image: string }): void {
        const sender = this.clients.get(client.id) || { nickname: 'Anonymous', image: '', colorNickname: '#000' };
        this.server.emit('msgToClient', {
            msg,
            senderNickname: sender.nickname,
            senderImage: sender.image,
            senderColorNickname: sender.colorNickname, // 💡 Corrigir aqui
        });
    }
    
    @SubscribeMessage('updatePosition')
    handleUpdatePosition(client: Socket, { lat, lng }: { lat: number, lng: number }): void {
        const sender = this.clients.get(client.id);
        if (sender) {
            sender.position = { lat, lng };
            this.server.emit('updatePosition', { 
                id: client.id, 
                nickname: sender.nickname,
                image: sender.image, 
                position: sender.position 
            });
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
