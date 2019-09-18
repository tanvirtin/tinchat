import { Logger } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway(4001)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    wss: any;

    private logger = new Logger('AppGateway');

    handleConnection(client: { emit: (arg0: string, arg1: string) => void; }) {
        this.logger.log('New client connected');
        client.emit('connection', 'Successfully connected to server');
    }

    handleDisconnect(client: any) {
        this.logger.log('Client disconnected');
    }
}
