const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const http = require('http');
const socketIO = require('socket.io');

const { apiRoutes } = require('./routes/api');
const { clientRoutes } = require('./routes/clientRoutes');
require('./core/passport');

const app = express();

app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', './layouts/with-header');
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoutes);
app.use('/', clientRoutes);

app.use((req, res) => {
    res.status(404).render('404', { layout: false });
});

const websocketServer = http.createServer(app);
const io = new socketIO.Server(websocketServer, {
    cors: 'http://localhost:3000',
    transports: 'websocket'
});

io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    // сообщение для всех
    socket.on('message-to-all', (msg) => {
        msg.type = 'all';
        socket.broadcast.emit('message-to-all', msg);
        socket.emit('message-to-all', msg);
    });

    // работа с комнатами
    const {roomName} = socket.handshake.query;
    console.log(`Socket roomName: ${roomName}`);
    socket.join(roomName);
    socket.on('message-to-room', (msg) => {
        msg.type = `room: ${roomName}`;
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

exports.app = app;
exports.websocketServer = websocketServer;