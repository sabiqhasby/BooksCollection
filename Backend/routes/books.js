const express = require("express");
const router = express.Router();
const response = require("../response");
const db = require("../connection");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM books";

  db.query(sql, (err, result) => {
    response(200, result, "get all data books", res);
  });
});

router.post("/", (req, res) => {
  res.send("create new book");
});

router
  .route("/:id")
  .patch((req, res) => {
    res.send("update book by id");
  })
  .delete((req, res) => {
    res.send("delete book by id");
  });

////MIDLEWARE
// router.param("id", (req, res, next, id) => {
//   console.log(id);
//   next();
// });

module.exports = router;
