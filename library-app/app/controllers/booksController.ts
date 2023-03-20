import { BooksService } from "../services/booksService";
import { container } from "../container";
import { Request, Response } from "express";
import * as path from "path";
import { IBook } from "../models/book";

const repo = container.get(BooksService);

export const getAll = async (req: Request, res: Response) => {
    try {
        const books = await repo.getAll();
        res.json(books);
    } catch (e) {
        res.status(500).json(e);
    }
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const book = await repo.getById(id);
        res.json(book);
    } catch (e) {
        res.status(500).json(e);
    }
}

export const create = async (req: any, res: Response) => {
    const bookDto = req.body;

    try {
        let createdBook = await repo.create(bookDto);

        if (req.file) {
            const { path } = req.file?.path;
            await repo.setFilePathToBook(createdBook.id, path);

            // @ts-ignore
            createdBook = {
                ...createdBook,
                fileBook: path
            };
        }

        res.status(201).json(createdBook);
    } catch (e) {
        res.status(500).json(e);
    }
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    await repo.update(id, req.body);
    const updatedBook = await repo.getById(id);

    res.json(updatedBook);
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    await repo.remove(id);

    res.send('ok');
}

export const downloadBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const book: IBook = await repo.getById(id);

    res.download(path.resolve(book.fileBook));
}