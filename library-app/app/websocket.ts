import { Socket, Server } from "socket.io";
const {container} = require('./container');
const {BooksService} = require('./services/booksService');

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

        socket.on('message-to-room', async (data: any) => {
            const message = await repo.saveComment(data);
            socket.to(roomName).emit('message-to-room', message);
            socket.emit('message-to-room', message);
        });
    });
};