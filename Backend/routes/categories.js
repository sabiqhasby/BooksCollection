const express = require("express");
const router = express.Router();
const response = require("../response");
const db = require("../connection");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, result) => {
    response(200, result, "Show all category", res);
  });
});

router.get("/:id/books", (req, res) => {
  res.send("show all data books by id category");
});

router.post("/", (req, res) => {
  res.send("Create new category");
});

router
  .route("/:id")
  .patch((req, res) => {
    res.send("update category by id category");
  })
  .delete((req, res) => {
    res.send("delete category by id category");
  });

////MIDLEWARE
// router.param("id", (req, res, next, id) => {
//   console.log(id);
//   next();
// });

module.exports = router;
