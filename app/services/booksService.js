const { Book } = require('../models/book');

const bookMockData = [
    new Book(),
    new Book(),
    new Book(),
];

class BooksService {
    constructor() {
        this.books = bookMockData;
    }

    getAll() {
        return this.books;
    }

    getById(bookId) {
        return this.books.find(b => b.id === bookId);
    }

    create(bookDto) {
        const book = new Book(bookDto);
        this.books.push(book);
        return book;
    }

    update(bookId, bookDto) {
        this.books = this.books.map(book => {
            if (book.id === bookId) {
                return {
                    ...book,
                    ...bookDto,
                    id: book.id
                };
            }

            return book;
        });
    }

    remove(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
    }
}

exports.BooksService = new BooksService();