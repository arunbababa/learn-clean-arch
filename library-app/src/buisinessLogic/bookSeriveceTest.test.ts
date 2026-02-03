import type { Book } from "../../prisma/generated/prisma/client";
import type { BookRepositoryInterface } from "../dataAccess/bookRepositoryInterface";
import { BookService } from "./bookService";

const mockBookRepository : jest.Mocked<BookRepositoryInterface> = {
  createBook: jest.fn(), // 仮のメソッドを割り当てて、モック化
  findBookByID: jest.fn(),
  findAllBooks: jest.fn(),
}

describe('BookService', () => {
    let bookService: BookService

    beforeEach(() => {
      bookService = new BookService(mockBookRepository);
    })

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('書籍の登録が成功する', async () => {
        const newBook: Book = {
          id: '1',
          title: 'test book',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        mockBookRepository.createBook.mockResolvedValue(newBook);
        const result = await bookService.addBook('test book'); // このaddBookでcreateBookが呼ばれる、上でモック化しているメソッドのこと
        expect(result).toEqual(newBook); // 戻り値が正しく伝藩していることの確認
        expect(mockBookRepository.createBook).toHaveBeenCalledWith('test book'); // ここでモック化したメソッドの引数に正しく値が渡されていることを確認する
    })
  }
);