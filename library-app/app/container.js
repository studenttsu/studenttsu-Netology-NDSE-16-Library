const { Container, decorate, injectable} = require('inversify');
const { BooksService } = require('./services/booksService');
require("reflect-metadata");

const container = new Container();

decorate(injectable(), BooksService);
container.bind(BooksService).toSelf();

exports.container = container;