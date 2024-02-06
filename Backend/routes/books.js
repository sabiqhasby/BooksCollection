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
router.patch("/:id", (req, res) => {
  res.send("update book by id");
});
router.delete(":id", (req, res) => {
  res.send("delete book by id");
});

module.exports = router;
