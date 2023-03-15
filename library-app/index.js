require('dotenv').config();

const mongoose = require('mongoose');
const { app } = require('./app/app');

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}

start();