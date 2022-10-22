const { Router } = require('express');
const booksController = require('../controllers/booksController');
const { checkBook } = require('../middlewares/checkBook');

const booksRoutes = Router();

booksRoutes
    .get('', booksController.getAll)
    .get('/:id', checkBook, booksController.getById)
    .post('', booksController.create)
    .put('/:id', checkBook, booksController.update)
    .delete('/:id', checkBook, booksController.remove);

exports.booksRoutes = booksRoutes;