const express = require('express');

const PORT = process.env.PORT || 3001;

const counterApp = express();

counterApp
    .post('/counter/:bookId/incr', (req, res) => {
        res.json({
            bookId: req.params.bookId,
            action: 'increase'
        });
    })
    .get('/counter/:bookId', (req, res) => {
        res.json({
            bookId: req.params.bookId,
            action: 'read123'
        });
    });

counterApp.listen(PORT, () => {
    console.log(`Counter app started on port ${PORT}`);
});