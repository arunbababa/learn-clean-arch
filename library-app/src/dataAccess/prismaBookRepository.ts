import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient, type Book } from "../../prisma/generated/prisma/client";
import type { BookRepositoryInterface } from "./bookRepositoryInterface";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

// export const prismaBookClient = new PrismaClient({ adapter }); // あれこれでもしかしてDB切り替えめっちゃ簡単にできる感じ
export class PrismaBookRepository implements BookRepositoryInterface {
  private prisma: PrismaClient;

  constructor(){
    this.prisma = new PrismaClient({ adapter });
  }

  createBook = async (title: string): Promise<Book> => {
    return await this.prisma.book.create({
      data:{
        title,
        isAvailable: true,
      }
    })
  }

  findBookByID = async (id: string): Promise<Book | null> => {
    return await this.prisma.book.findUnique({
      where: { id },
    });
  };

  findAllBooks = async (): Promise<Book[]> => {
    return await this.prisma.book.findMany();
  }
}

