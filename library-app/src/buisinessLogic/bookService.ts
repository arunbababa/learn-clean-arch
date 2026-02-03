import type { Book } from "../../prisma/generated/prisma/client";
import type { BookRepositoryInterface } from "../dataAccess/bookRepositoryInterface";
import type { BookServiceInterface } from "./bookServiceInterface";

export class BookService implements BookServiceInterface {

  constructor(private bookRepository: BookRepositoryInterface){
  }

  addBook = async (title: string): Promise<Book> => {
    return await this.bookRepository.createBook(title);
  }

  findBookByID = async (id: string): Promise<Book | null> => {
    return await this.bookRepository.findBookByID(id);
  }

  findAllBooks = async (): Promise<Book[]> => {
    return await this.bookRepository.findAllBooks();
  }
}
