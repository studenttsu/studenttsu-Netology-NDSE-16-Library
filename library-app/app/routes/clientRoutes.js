const { Router } = require('express');
const passport = require('passport');
const { BooksService } = require('../services/booksService');
const { CounterService } = require('../services/counterService');
const uploadBook = require('../middlewares/uploadBook');
const { Book } = require('../models/book');
const {container} = require('../container');
const {authMiddleware} = require('../middlewares/auth');

const clientRoutes = Router();
const repo = container.get(BooksService);

clientRoutes
    .get('', authMiddleware, async (req, res) => {
        const books = await repo.getAll();
        res.render('index', { books });
    })
    .get('/login', (req, res) => {
        res.render('login', { layout: './layouts/base' });
    })
    .post('/signin', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }))
    .get('/logout', (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    })
    .get('/signup', (req, res) => {
        res.render('signup', { layout: './layouts/base' });
    })
    .get('/create', authMiddleware, async (req, res) => {
        res.render('book-edit', {
            isCreate: true,
            book: new Book()
        });
    })
    .get('/edit/:id', authMiddleware, async (req, res) => {
        const book = await repo.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

        res.render('book-edit', {
            isCreate: false,
            book
        });
    })
    .get('/view/:id', authMiddleware, async (req, res) => {
        const bookId = req.params.id;
        const book = await repo.getById(bookId);

        if (!book) {
            res.redirect('/');
        }

        const views = await CounterService.getBookViewCount(bookId);
        await CounterService.increaseBookViewCount(bookId);

        res.render('view', { book, viewCount: views ? views.count + 1 : 0 });
    })
    .post('/create-book', authMiddleware, uploadBook.single('fileBook'), async (req, res) => {
        const bookDto = req.body;
        let createdBook = await repo.create(bookDto);

        if (req.file) {
            const { path } = req.file;
            await repo.setFilePathToBook(createdBook.id, path);
        }

        res.redirect('/');
    })
    .post('/edit-book/:id', authMiddleware, uploadBook.single('fileBook'), async (req, res) => {
        const book = await repo.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

        await repo.update(req.params.id, req.body);
        res.redirect(`/view/${req.params.id}`);
    })
    .get('/remove/:id', authMiddleware, async (req, res) => {
       await repo.remove(req.params.id);
       res.redirect('/');
    });

exports.clientRoutes = clientRoutes;