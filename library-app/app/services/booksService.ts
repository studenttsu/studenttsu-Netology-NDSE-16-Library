import { IBook } from "../core/interfaces/IBook";
import { BookSchema } from "../models/book";
import { BookDiscussionMessageSchema } from "../models/bookDiscussionMessage";
import { injectableService } from "../container";

interface IBookMessage {
    bookId: string,
    authorId: string,
    message: string
}

export class BooksService {
    constructor() {
        injectableService(this)
    }

    getAll() {
        return BookSchema.find().select('-__v');
    }

    getById(bookId: string) {
        return BookSchema.findById(bookId).select('-__v');
    }

    async create(bookDto: Omit<IBook, 'id'>) {
        const book = new BookSchema(bookDto);
        await book.save();
        return book;
    }

    async update(bookId: string, bookDto: IBook) {
        await BookSchema.findByIdAndUpdate(bookId, bookDto);
    }

    async remove(bookId: string) {
        await BookSchema.findByIdAndDelete(bookId);
    }

    async setFilePathToBook(bookId: string, path: string) {
        await BookSchema.findByIdAndUpdate(bookId, { fileBook: path });
    }

    async saveComment({ bookId, authorId, message }: IBookMessage) {
        const data = new BookDiscussionMessageSchema({
            bookId, authorId, message
        });

        return data.save();
    }

    getBookComments(bookId: string) {
        return BookDiscussionMessageSchema.find({ bookId });
    }
}