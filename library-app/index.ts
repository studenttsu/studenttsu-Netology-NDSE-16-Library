import "reflect-metadata";
import * as mongoose from 'mongoose';
import { app, websocketServer } from "./app/app";
import { BookSchema } from "./app/models/book";

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const WEBSOCKET_PORT = process.env.PORT || 3004;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        await seedData();

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });

        websocketServer.listen(WEBSOCKET_PORT, () => {
            console.log(`Websocket server started on port ${WEBSOCKET_PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}

async function seedData() {
    const count = await BookSchema.count();

    if (count === 0) {
        const data = require('./public/books.json');
        await BookSchema.insertMany(data);
    }
}

start();