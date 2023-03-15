const { Router } = require('express');
const { BooksService } = require('../services/booksService');
const { CounterService } = require('../services/counterService');
const uploadBook = require('../middlewares/uploadBook');
const { Book } = require('../models/book');

const clientRoutes = Router();

clientRoutes
    .get('', async (req, res) => {
        const books = await BooksService.getAll();
        res.render('index', { books });
    })
    .get('/create', async (req, res) => {
        res.render('book-edit', {
            isCreate: true,
            book: new Book()
        });
    })
    .get('/edit/:id', async (req, res) => {
        const book = await BooksService.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

        res.render('book-edit', {
            isCreate: false,
            book
        });
    })
    .get('/view/:id', async (req, res) => {
        const bookId = req.params.id;
        const book = await BooksService.getById(bookId);

        if (!book) {
            res.redirect('/');
        }

        const views = await CounterService.getBookViewCount(bookId);
        await CounterService.increaseBookViewCount(bookId);

        res.render('view', { book, viewCount: views ? views.count + 1 : 0 });
    })
    .post('/create-book', uploadBook.single('fileBook'), async (req, res) => {
        const bookDto = req.body;
        let createdBook = await BooksService.create(bookDto);

        if (req.file) {
            const { path } = req.file;
            await BooksService.setFilePathToBook(createdBook.id, path);
        }

        res.redirect('/');
    })
    .post('/edit-book/:id', uploadBook.single('fileBook'), async (req, res) => {
        const book = await BooksService.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

        await BooksService.update(req.params.id, req.body);
        res.redirect(`/view/${req.params.id}`);
    })
    .get('/remove/:id', async (req, res) => {
       await BooksService.remove(req.params.id);
       res.redirect('/');
    });

exports.clientRoutes = clientRoutes;