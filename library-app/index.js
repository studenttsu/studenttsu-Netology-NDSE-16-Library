require('dotenv').config();

const mongoose = require('mongoose');
const { app } = require('./app/app');
const { BookSchema } = require('./app/models/book');

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        await seedData();

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
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