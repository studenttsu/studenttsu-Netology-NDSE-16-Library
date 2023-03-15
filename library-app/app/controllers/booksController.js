const { BooksService } = require('../services/booksService');
const path = require('path');

exports.getAll = async (req, res) => {
    try {
        const books = await BooksService.getAll();
        res.json(books);
    } catch (e) {
        res.status(500).json(e);
    }
}

exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await BooksService.getById(id);
        res.json(book);
    } catch (e) {
        res.status(500).json(e);
    }
}

exports.create = async (req, res) => {
    const bookDto = req.body;

    try {
        let createdBook = await BooksService.create(bookDto);

        if (req.file) {
            const { path } = req.file?.path;
            await BooksService.setFilePathToBook(createdBook.id, path);

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

    await BooksService.update(id, req.body);
    const updatedBook = BooksService.getById(id);

    res.json(updatedBook);
}

exports.remove = async (req, res) => {
    const { id } = req.params;
    await BooksService.remove(id);

    res.send('ok');
}

exports.downloadBook = async (req, res) => {
    const { id } = req.params;
    const book = await BooksService.getById(id);

    res.download(path.resolve(book.fileBook));
}