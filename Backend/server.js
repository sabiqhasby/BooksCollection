const express = require("express");
const db = require("./connection");
const response = require("./response");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const sql = "SELECT * FROM books";

  db.query(sql, (err, result) => {
    response(200, result, "get all data books", res);
  });
});

// CATEGORIES
app.get("/categories", (req, res) => {
  res.send("menampilkan seluruh category");
});
app.post("/categories", (req, res) => {
  res.send("Create new category");
});
app.patch("/categories/:id", (req, res) => {
  res.send("update category by id category");
});
app.delete("/categories/:id", (req, res) => {
  res.send("delete category by id category");
});
app.get("/categories/:id/books", (req, res) => {
  res.send("show all data books by id category");
});

// BOOKS
app.get("/books", (req, res) => {
  res.send("show all data books");
});
app.post("/books", (req, res) => {
  res.send("create new book");
});
app.patch("/books/:id", (req, res) => {
  res.send("update book by id");
});
app.delete("/books/:id", (req, res) => {
  res.send("delete book by id");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
