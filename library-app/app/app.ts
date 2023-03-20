import * as express from "express";
import * as expressLayouts from 'express-ejs-layouts';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as http from 'http';

import apiRoutes from './routes/api';
import { clientRoutes } from "./routes/clientRoutes";
import { createWebsocketIO } from "./websocket";
import './core/passport';

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

app.use((req: express.Request, res: express.Response) => {
    res.status(404).render('404', { layout: false });
});

const websocketServer = http.createServer(app);
createWebsocketIO(websocketServer);

export { app, websocketServer };