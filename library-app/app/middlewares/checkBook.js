const { BooksService } = require('../services/booksService');

function checkBook(req, res, next) {
    const { id } = req.params;

    const book = BooksService.getById(id);

    if (!book) {
        res.status(404).json({ error: 'Книга не найдена' });
        return;
    }

    next();
}

exports.checkBook = checkBook;