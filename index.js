const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let books = [
  { id: 1, title: "Book 1", author: "Book 1 author" },
  { id: 2, title: "Book 2", author: "Book 2 author" },
  { id: 3, title: "Book 3", author: "Book 3 author" },
];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Add new book
app.post("/books", (req, res) => {
  const newBook = req.body;
  console.log(req.body);
  let lastId = 0;
  books.forEach((book) => {
    if (book.id > lastId) {
      lastId = book.id;
    }
  });
  newBook.id = lastId + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// Get book by id
app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.findIndex((book) => book.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Update book by id
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books[index] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Delete book by id
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    const deletedBook = books.splice(index, 1)[0];
    res.json(deletedBook);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Listen on specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
