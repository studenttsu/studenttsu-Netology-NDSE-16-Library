const { BooksService } = require('../services/booksService');

async function checkBook(req, res, next) {
    const { id } = req.params;

    const book = await BooksService.getById(id);

    if (!book) {
        res.status(404).json({ error: 'Книга не найдена' });
        return;
    }

    next();
}

exports.checkBook = checkBook;