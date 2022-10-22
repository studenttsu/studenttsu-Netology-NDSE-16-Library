const { v4: uuid } = require('uuid')

class Book {
    constructor(book) {
        this.id = uuid();
        this.title = '';
        this.description = '';
        this.authors = '';
        this.favorite = '';
        this.fileCover = '';
        this.fileName = '';

        if (book) {
            Object.assign(this, book);
        }
    }
}

exports.Book = Book;