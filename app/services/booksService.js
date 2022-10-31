const { Book } = require('../models/book');

const bookMockData = [
    new Book({
        id: 'd69d2f8a2eefe7daf2e8f77965c0f350',
        title: 'Мастер и Маргарита',
        authors: 'Михаил Афанасьевич Булгаков',
        description: 'Роман Михаила Афанасьевича Булгакова, работа над которым началась в декабре 1928 года и продолжалась вплоть до смерти писателя. Роман относится к незавершённым произведениям; редактирование и сведение воедино черновых записей осуществляла после смерти мужа вдова писателя - Елена Сергеевна. Первая версия романа, имевшая названия «Копыто инженера», «Чёрный маг» и другие, была уничтожена Булгаковым в 1930 году. В последующих редакциях среди героев произведения появились автор романа о Понтии Пилате и его возлюбленная.',
        fileCover: '/books-covers/d69d2f8a2eefe7daf2e8f77965c0f350.jpg'
    }),
    new Book({
        id: '25c2ef0839087cf6bff4c32fed22505d',
        title: '451 градус по Фаренгейту',
        authors: 'Рэй Брэдбери',
        description: 'Научно-фантастический роман-антиутопия Рэя Брэдбери, изданный в 1953 году. Роман описывает американское общество близкого будущего, в котором книги находятся под запретом; «пожарные», к числу которых принадлежит и главный герой Гай Монтэг, сжигают любые найденные книги. В ходе романа Монтэг разочаровывается в идеалах общества, частью которого он является, становится изгоем и присоединяется к небольшой подпольной группе маргиналов, сторонники которой заучивают тексты книг, чтобы спасти их для потомков. Название книги объясняется в эпиграфе: «451 градус по Фаренгейту - температура, при которой воспламеняется и горит бумага»',
        fileCover: '/books-covers/25c2ef0839087cf6bff4c32fed22505d.webp'
    }),
    new Book({
        id: 'l4ajqgq4vc1u42sp62v3r75lv7alhhbj',
        title: 'Цветы для Элджернона',
        authors: 'Дэниел Киз',
        description: 'Научно-фантастический рассказ Дэниела Киза. Первоначально издан в апрельском номере «Журнала фэнтези и научной фантастики» за 1959 год. Премия «Хьюго» за лучший короткий научно-фантастический рассказ.',
        fileCover: '/books-covers/l4ajqgq4vc1u42sp62v3r75lv7alhhbj.webp'
    }),
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
                    id: book.id,
                    fileBook: book.fileBook
                };
            }

            return book;
        });
    }

    remove(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
    }

    setFilePathToBook(bookId, path) {
        this.books = this.books.map(book => {
            if (book.id === bookId) {
                return {
                    ...book,
                    fileBook: path
                };
            }

            return book;
        });
    }
}

exports.BooksService = new BooksService();