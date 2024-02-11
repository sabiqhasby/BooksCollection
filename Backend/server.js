const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// const allowedOrigins = ["http://localhost:8000", "www.example2.com"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) {
//         return callback(null, true);
//       }

//       if (allowedOrigins.includes(origin)) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

app.use(cors());

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
