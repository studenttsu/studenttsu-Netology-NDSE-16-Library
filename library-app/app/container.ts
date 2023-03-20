import { Container } from "inversify";
import { BooksService } from "./services/booksService";
import { UsersService } from "./services/usersService";

export const container = new Container();

container.bind<BooksService>(BooksService).toSelf();
container.bind<UsersService>(UsersService).toSelf();