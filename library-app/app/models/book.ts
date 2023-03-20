import * as uuid from 'uuid';
import { model, Schema } from "mongoose";

export interface IBook {
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
}

const bookSchema = new Schema<IBook>({
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

export const BookSchema = model('Book', bookSchema);

export class Book {
    id = uuid.v4();
    title = '';
    description = '';
    authors = '';
    favorite = '';
    fileCover = '';
    fileName = '';
    fileBook = '';

    constructor() {}
}