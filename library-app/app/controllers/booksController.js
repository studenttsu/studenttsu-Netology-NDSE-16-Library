const path = require('path');
const { BooksService } = require('../services/booksService');
const { container } = require('../container');

const repo = container.get(BooksService);

exports.getAll = async (req, res) => {
    try {
        const books = await repo.getAll();
        res.json(books);
    } catch (e) {
        res.status(500).json(e);
    }
}

exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await repo.getById(id);
        res.json(book);
    } catch (e) {
        res.status(500).json(e);
    }
}

exports.create = async (req, res) => {
    const bookDto = req.body;

    try {
        let createdBook = await repo.create(bookDto);

        if (req.file) {
            const { path } = req.file?.path;
            await repo.setFilePathToBook(createdBook.id, path);

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

exports.update = async (req, res) => {
    const { id } = req.params;

    await repo.update(id, req.body);
    const updatedBook = await repo.getById(id);

    res.json(updatedBook);
}

exports.remove = async (req, res) => {
    const { id } = req.params;
    await repo.remove(id);

    res.send('ok');
}

exports.downloadBook = async (req, res) => {
    const { id } = req.params;
    const book = await repo.getById(id);

    res.download(path.resolve(book.fileBook));
}