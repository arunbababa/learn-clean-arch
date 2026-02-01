import express from 'express';
import { BookController } from './presentation/bookController';
import { BookService } from './buisinessLogic/bookService';
import { PrismaBookRepository } from './dataAccess/prismaBookRepository';
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3009;

app.get('/', (req, res) => {
  res.send('Hello World');
});

const bookRepository = new PrismaBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

app.post('/books', (req, res) => bookController.addBook(req, res));
app.get('/books/:id', (req, res) => bookController.findBookByID(req, res));
app.get('/books', (req, res) => bookController.findAllBooks(req, res));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});