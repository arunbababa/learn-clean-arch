import type { Book } from "../../prisma/generated/prisma/client";

export interface BookServiceInterface {
  addBook: (title: string) => Promise<Book>;
  findBookByID: (id: string) => Promise<Book | null>;
  findAllBooks: () => Promise<Book[]>;
}