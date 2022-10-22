const { BooksService } = require('../services/booksService');

exports.getAll = (req, res) => {
    res.json(BooksService.getAll());
}

exports.getById = (req, res) => {
    const { id } = req.params;

    const book = BooksService.getById(id);

    if (!book) {
        res.status(404);
        res.json({ error: 'Книга не найдена' });
        return;
    }

    res.json(book);
}

exports.create = (req, res) => {
    res.send('create');
}

exports.update = (req, res) => {
    const { id } = req.params;

    const book = BooksService.getById(id);

    if (!book) {
        res.status(404);
        res.json({ error: 'Книга не найдена' });
        return;
    }

    BooksService.update(id, req.body);
    const updatedBook = BooksService.getById(id);

    res.json(updatedBook);
}

exports.remove = (req, res) => {
    const { id } = req.params;

    const book = BooksService.getById(id);

    if (!book) {
        res.status(404);
        res.json({ error: 'Книга не найдена' });
        return;
    }

    BooksService.remove(id);
    res.send('ok');
}