const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const http = require('http');

const { apiRoutes } = require('./routes/api');
const { clientRoutes } = require('./routes/clientRoutes');
const { createWebsocketIO } = require('./websocket');
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
createWebsocketIO(websocketServer);

exports.app = app;
exports.websocketServer = websocketServer;