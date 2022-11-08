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
            console.log('[debug] POST', bookId);

            const count = await redisClient.get(bookId);
            console.log('[debug] count', count);
            const _nextCount = count ? parseInt(count, 0) + 1 : 1;
            console.log('[debug] _nextCount', _nextCount);

            await redisClient.set(bookId, _nextCount);
            console.log('[debug] set');

            res.json({
                bookId: req.params.bookId,
                count: _nextCount
            });
        })
        .get('/counter/:bookId', async (req, res) => {
            const { bookId } = req.params;
            console.log('[debug] GET', bookId);
            const count = await redisClient.get(bookId);
            console.log('[debug] count', count);
            console.log('[debug] resp', { count: count ? JSON.parse(count, 0) : 0 });

            res.json({ count: count ? JSON.parse(count, 0) : 0 });
        });

    counterApp.listen(PORT, () => {
        console.log(`Counter app started on port ${PORT}`);
    });
})();