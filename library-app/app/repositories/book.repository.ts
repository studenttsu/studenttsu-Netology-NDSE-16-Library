import { Repository } from './repository';

interface Book {
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
}

export class BookRepository implements Repository<Book> {
    create(entity: Book) {}
    update(id: string, entity: Book) {}
    getById(id: string) {}
    getAll() {}
    delete(id: string) {}
}