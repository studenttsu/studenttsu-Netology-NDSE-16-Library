const express = require('express');
const {createClient} = require('redis');

const PORT = process.env.PORT || 3001;
const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';

const counterApp = express();
const redisClient = createClient({ url: REDIS_URL });

counterApp
    .post('/counter/:bookId/incr', async (req, res) => {
        const { bookId } = res.params;
        const count = await redisClient.incr(bookId);

        res.json({
            bookId: req.params.bookId,
            count
        });
    })
    .get('/counter/:bookId', async (req, res) => {
        const { bookId } = res.params;
        const count = await redisClient.get(bookId);
        res.json({ count });
    });

(async () => {
    await redisClient.connect();

    counterApp.listen(PORT, () => {
        console.log(`Counter app started on port ${PORT}`);
    });
})();