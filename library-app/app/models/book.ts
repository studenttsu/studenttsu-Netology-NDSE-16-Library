import * as uuid from 'uuid';
import { model, Schema } from "mongoose";
import { IBook } from "../core/interfaces/IBook";

export const BookSchema = model('Book', new Schema({
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
}));

export class Book {
    id = uuid.v4();
    title = '';
    description = '';
    authors = '';
    favorite = '';
    fileCover = '';
    fileName = '';
    fileBook = '';

    constructor(book: IBook) {
        if (book) {
            Object.assign(this, book);
        }
    }
}