import { NextFunction, Request, Response, Router } from "express";
import * as passport from "passport";

import { BooksService } from "../services/booksService";
import { UsersService } from "../services/usersService";
import CounterService from "../services/counterService";
import { container } from "../container";
import { authMiddleware } from "../middlewares/auth";
import { Book } from "../models/book";
import uploadBook from "../middlewares/uploadBook";

export const clientRoutes = Router();
const booksRepo = container.get(BooksService);
const usersRepo = container.get(UsersService);

clientRoutes
    .get('', authMiddleware, async (req: Request, res: Response) => {
        const books = await booksRepo.getAll();
        res.render('index', { books });
    })
    .get('/auth/yandex',
        passport.authenticate('yandex')
    )
    .get('/auth/yandex/callback',
        passport.authenticate('yandex', {failureRedirect: '/'}),
        (req, res) => {
            res.redirect('/');
        }
    )
    .get('/login', (req: Request, res: Response) => {
        res.render('login', { layout: './layouts/base' });
    })
    .post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }))
    .get('/logout', (req: Request, res: Response, next: NextFunction) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    })
    .get('/signup', (req: Request, res: Response) => {
        res.render('signup', { layout: './layouts/base' });
    })
    .post('/signup', async (req: Request, res: Response) => {
        await usersRepo.createUser(req.body);
        res.redirect('/');
    })
    .get('/me', authMiddleware, (req: Request, res: Response) => {
        res.render('profile', { user: req.user });
    })
    .get('/create', authMiddleware, async (req: Request, res: Response) => {
        res.render('book-edit', {
            isCreate: true,
            book: new Book()
        });
    })
    .get('/edit/:id', authMiddleware, async (req: Request, res: Response) => {
        const book = await booksRepo.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

        res.render('book-edit', {
            isCreate: false,
            book
        });
    })
    .get('/view/:id', authMiddleware, async (req: any, res: Response) => {
        const bookId = req.params.id;
        const book = await booksRepo.getById(bookId);

        if (!book) {
            res.redirect('/');
        }

        const views = await CounterService.getBookViewCount(bookId);
        await CounterService.increaseBookViewCount(bookId);
        const comments = await booksRepo.getBookComments(bookId);

        res.render('view', {
            book,
            viewCount: views ? views.count + 1 : 0,
            comments,
            userId: req.user.id
        });
    })
    .post('/create-book', authMiddleware, uploadBook.single('fileBook'), async (req: any, res: Response) => {
        const bookDto = req.body;
        let createdBook = await booksRepo.create(bookDto);

        if (req.file) {
            const { path } = req.file;
            await booksRepo.setFilePathToBook(createdBook.id, path);
        }

        res.redirect('/');
    })
    .post('/edit-book/:id', authMiddleware, uploadBook.single('fileBook'), async (req: Request, res: Response) => {
        const book = await booksRepo.getById(req.params.id);

        if (!book) {
            res.redirect('/');
        }

        await booksRepo.update(req.params.id, req.body);
        res.redirect(`/view/${req.params.id}`);
    })
    .get('/remove/:id', authMiddleware, async (req: Request, res: Response) => {
       await booksRepo.remove(req.params.id);
       res.redirect('/');
    });

exports.clientRoutes = clientRoutes;