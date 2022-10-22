const { Router } = require('express');
const booksController = require('../controllers/booksController');

const booksRouter = Router();

booksRouter
    .get('', booksController.getAll)
    .get(':id', booksController.getById)
    .post('', booksController.create)
    .put(':id', booksController.update)
    .delete(':id', booksController.remove);

exports.booksRouter = booksRouter;