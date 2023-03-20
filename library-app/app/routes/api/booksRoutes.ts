import { Router } from "express";
import { checkBook } from "../../middlewares/checkBook";
import uploadBook from "../../middlewares/uploadBook";
import * as booksController from '../../controllers/booksController';

export const booksRoutes = Router();

booksRoutes
    .get('', booksController.getAll)
    .get('/:id', checkBook, booksController.getById)
    .get('/:id/download', checkBook, booksController.downloadBook)
    .post('', uploadBook.single('fileBook'), booksController.create)
    .put('/:id', checkBook, booksController.update)
    .delete('/:id', checkBook, booksController.remove);