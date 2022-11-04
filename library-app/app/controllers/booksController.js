const { BooksService } = require('../services/booksService');
const path = require('path');

exports.getAll = (req, res) => {
    res.json(BooksService.getAll());
}

exports.getById = (req, res) => {
    const { id } = req.params;
    const book = BooksService.getById(id);

    res.json(book);
}

exports.create = (req, res) => {
    const bookDto = req.body;
    let createdBook = BooksService.create(bookDto);

    if (req.file) {
        const { path } = req.file;
        BooksService.setFilePathToBook(createdBook.id, path);

        createdBook = {
            ...createdBook,
            fileBook: path
        };
    }

    res.status(201).json(createdBook);
}

exports.update = (req, res) => {
    const { id } = req.params;

    BooksService.update(id, req.body);
    const updatedBook = BooksService.getById(id);

    res.json(updatedBook);
}

exports.remove = (req, res) => {
    const { id } = req.params;
    BooksService.remove(id);

    res.send('ok');
}

exports.downloadBook = (req, res) => {
    const { id } = req.params;
    const book = BooksService.getById(id);

    res.download(path.resolve(book.fileBook));
}