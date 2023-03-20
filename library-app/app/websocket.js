const socketIO = require('socket.io');
const {container} = require('./container');
const {BooksService} = require('./services/booksService');

const repo = container.get(BooksService);

const createWebsocketIO = websocketServer => {
    const io = new socketIO.Server(websocketServer, {
        cors: 'http://localhost:3000',
        transports: 'websocket'
    });

    io.on('connection', socket => {
        const { roomName } = socket.handshake.query;

        socket.join(roomName);

        socket.on('message-to-room', async data => {
            const message = await repo.saveComment(data);
            socket.to(roomName).emit('message-to-room', message);
            socket.emit('message-to-room', message);
        });
    });
};

exports.createWebsocketIO = createWebsocketIO;