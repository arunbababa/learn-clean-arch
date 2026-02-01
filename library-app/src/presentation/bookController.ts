import type { Request, Response } from "express";
import { BookService } from "../buisinessLogic/bookService";
import type { BookServiceInterface } from "../buisinessLogic/bookServiceInterface";

export class BookController {
  constructor(private readonly bookService: BookServiceInterface){
  }

  addBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const title = req.body.title as string;
      const book = await this.bookService.addBook(title);
      res.status(201).json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "書籍の登録に失敗しました" });
    }
  }

  findBookByID = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const book = await this.bookService.findBookByID(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "書籍が見つかりませんでした" });
      }
      res.status(200).json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "書籍の検索に失敗しました" });
    }
  }

  findAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const books = await this.bookService.findAllBooks();
      res.status(200).json(books);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "書籍の検索に失敗しました" });
    }
  }
}