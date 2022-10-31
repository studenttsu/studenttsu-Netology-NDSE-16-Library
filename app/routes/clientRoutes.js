const { Router } = require('express');
const {BooksService} = require('../services/booksService');
const uploadBook = require('../middlewares/uploadBook');
const {Book} = require('../models/book');

const clientRoutes = Router();

clientRoutes
    .get('', (req, res) => {
        const books = BooksService.getAll();
        res.render('index', { books });
    })
    .get('/create', (req, res) => {
        res.render('book-edit', {
            isCreate: true,
            book: new Book()
        });
    })
    .get('/edit/:id', (req, res) => {
        const book = BooksService.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

        res.render('book-edit', {
            isCreate: false,
            book
        });
    })
    .get('/view/:id', (req, res) => {
        const book = BooksService.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

       res.render('view', { book });
    })
    .post('/create-book', uploadBook.single('fileBook'), (req, res) => {
        const bookDto = req.body;
        let createdBook = BooksService.create(bookDto);

        if (req.file) {
            const { path } = req.file;
            BooksService.setFilePathToBook(createdBook.id, path);
        }

        res.redirect('/');
    })
    .post('/edit-book/:id', uploadBook.single('fileBook'), (req, res) => {
        const book = BooksService.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

        BooksService.update(req.params.id, req.body);
        res.redirect(`/view/${req.params.id}`);
    });

exports.clientRoutes = clientRoutes;