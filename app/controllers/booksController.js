const { BooksService } = require('../services/booksService');

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
    const createdBook = BooksService.create(bookDto);

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