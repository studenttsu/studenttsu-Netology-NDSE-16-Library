import { NextFunction, Request, Response } from "express";
import { container } from "../container";
import { BooksService } from "../services/booksService";

const repo = container.get(BooksService);

export async function checkBook(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const book = await repo.getById(id);

    if (!book) {
        res.status(404).json({ error: 'Книга не найдена' });
        return;
    }

    next();
}