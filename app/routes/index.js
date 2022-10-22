const { Router } = require('express');
const { booksRoutes } = require('./booksRoutes');
const { usersRoutes } = require('./usersRoutes');

const router = Router();

router.use('/books', booksRoutes);
router.use('/user', usersRoutes);

exports.appRouter = router;