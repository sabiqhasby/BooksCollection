const express = require("express");
const router = express.Router();
const response = require("../response");
const db = require("../connection");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, result) => {
    if (err) response(500, "invalid", err, res);
    response(200, result, "Show all category", res);
  });
});

router.get("/:id/books", (req, res) => {
  res.send("show all data books by id category");
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const sql = `INSERT INTO categories (name) VALUES ('${name}')`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "failed insert data", err, res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "successfully added new category", res);
    }
  });
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
