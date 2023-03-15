const { Router } = require('express');
const booksController = require('../../controllers/booksController');
const { checkBook } = require('../../middlewares/checkBook');
const uploadBook  = require('../../middlewares/uploadBook');

const booksRoutes = Router();

booksRoutes
    .get('', booksController.getAll)
    .get('/:id', checkBook, booksController.getById)
    .get('/:id/download', checkBook, booksController.downloadBook)
    .post('', uploadBook.single('fileBook'), booksController.create)
    .put('/:id', checkBook, booksController.update)
    .delete('/:id', checkBook, booksController.remove);

exports.booksRoutes = booksRoutes;