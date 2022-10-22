const { Router } = require('express');
const {BooksService} = require('../services/booksService');
const uploadBook = require('../middlewares/uploadBook');

const clientRoutes = Router();

clientRoutes
    .get('', (req, res) => {
        const books = BooksService.getAll();
        res.render('index', { books });
    })
    .get('/create', (req, res) => {
        res.render('create');
    })
    .get('/view/:id', (req, res) => {
        const book = BooksService.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

       res.render('view', { book });
    })
    .post('/create', uploadBook.single('fileBook'), (req, res) => {
        const bookDto = req.body;
        let createdBook = BooksService.create(bookDto);

        if (req.file) {
            const { path } = req.file;
            BooksService.setFilePathToBook(createdBook.id, path);
        }

        res.redirect('/');
    });

exports.clientRoutes = clientRoutes;