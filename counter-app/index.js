const express = require('express');
const morgan = require('morgan');
const { createClient } = require('redis');

const PORT = process.env.PORT || 3001;
const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';

const counterApp = express();
counterApp.use(morgan('tiny'));

const redisClient = createClient({ url: REDIS_URL });

(async () => {
    await redisClient.connect();


    counterApp
        .post('/counter/:bookId/incr', async (req, res) => {
            const { bookId } = req.params;

            const count = await redisClient.get(bookId);
            const _nextCount = count ? parseInt(count, 0) + 1 : 1;
            await redisClient.set(bookId, _nextCount);

            res.json({
                bookId: req.params.bookId,
                count: _nextCount
            });
        })
        .get('/counter/:bookId', async (req, res) => {
            const { bookId } = req.params;
            const count = await redisClient.get(bookId);
            res.json({ count: count ? JSON.parse(count, 0) : 0 });
        });

    counterApp.listen(PORT, () => {
        console.log(`Counter app started on port ${PORT}`);
    });
})();