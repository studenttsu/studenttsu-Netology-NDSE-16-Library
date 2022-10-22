const { Router } = require('express');
const { booksRouter } = require('./booksRoutes');

const router = Router();

router.use('/books', booksRouter);

exports.appRouter = router;