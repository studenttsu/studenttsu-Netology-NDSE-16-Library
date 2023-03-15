const { v4: uuid } = require('uuid')
const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    authors: {
        type: String,
        required: true
    },
    favorite: String,
    fileCover: String,
    fileName: String,
    fileBook: String
});

class Book {
    constructor(book) {
        this.id = uuid();
        this.title = '';
        this.description = '';
        this.authors = '';
        this.favorite = '';
        this.fileCover = '';
        this.fileName = '';
        this.fileBook = '';

        if (book) {
            Object.assign(this, book);
        }
    }
}

exports.Book = Book;
exports.BookSchema = model('Book', BookSchema);