import { PrismaBookRepository } from "../dataAccess/prismaBookClient";
import type { Book } from "../../prisma/generated/prisma/client";


export class BookService {
  private bookRepository: PrismaBookRepository;

  constructor(){
    this.bookRepository = new PrismaBookRepository;
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
