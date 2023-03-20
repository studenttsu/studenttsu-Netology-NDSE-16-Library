import { Socket, Server } from "socket.io";
import { BooksService, IBookMessage } from "./services/booksService";
import { container } from "./container";

const repo = container.get(BooksService);

export const createWebsocketIO = (websocketServer: any) => {
    const io = new Server(websocketServer, {
        cors: {
            origin: 'http://localhost:3000'
        },
        transports: ['websocket']
    });

    io.on('connection', (socket: Socket) => {
        const { roomName } = socket.handshake.query;

        socket.join(roomName);

        socket.on('message-to-room', async (data: IBookMessage) => {
            const message = await repo.saveComment(data);
            socket.to(roomName).emit('message-to-room', message);
            socket.emit('message-to-room', message);
        });
    });
};