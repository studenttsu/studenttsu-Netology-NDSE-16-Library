const { BookSchema } = require('../models/book');

class BooksService {
    getAll() {
        return BookSchema.find().select('-__v');
    }

    getById(bookId) {
        return BookSchema.findById(bookId).select('-__v');
    }

    async create(bookDto) {
        const book = new BookSchema(bookDto);
        await book.save();
        return book;
    }

    async update(bookId, bookDto) {
        await BookSchema.findByIdAndUpdate(bookId, bookDto);
    }

    async remove(bookId) {
        await BookSchema.findByIdAndDelete(bookId);
    }

    async setFilePathToBook(bookId, path) {
        await BookSchema.findByIdAndUpdate(bookId, { fileBook: path });
    }
}

exports.BooksService = BooksService;