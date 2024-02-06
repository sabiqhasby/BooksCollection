const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Books Collection API");
});

// CATEGORIES
const categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);

// BOOKS
const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
