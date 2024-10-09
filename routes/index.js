var express = require('express');
var router = express.Router();
const app = express();
const port = 3100;

let books = [];
app.use(express.json());

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send('Missing title or author');
  }

  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).send(newBook);
});

// Get All Books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a Single Book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.json(book);
});

// Update a Book
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }

  const { title, author } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;

  res.send(book);
});

// Delete a Book
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = router;
