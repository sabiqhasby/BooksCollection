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
  const id = req.params.id;
  const { title, sortByTitle, minYear, maxYear, minPage, maxPage } = req.query;

  let sql = `SELECT * FROM books WHERE category_id=${id}`;

  // FILTERING BOOKS QUERY
  if (title) sql += ` AND title LIKE '%${title}%'`;
  if (minYear) sql += ` AND release_year >= ${minYear}`;
  if (maxYear) sql += ` AND release_year <= ${maxYear}`;
  if (minPage) sql += ` AND total_page >= ${minPage}`;
  if (maxPage) sql += ` AND total_page <= ${maxPage}`;
  if (sortByTitle) sql += ` ORDER BY title ${sortByTitle}`;
  console.log(sql);

  db.query(sql, (err, result) => {
    if (err) response(500, "invalid", err, res);

    if (!result.length) {
      const data = {
        message: "data not found",
      };
      response(400, data, "data not found", res);
    }
    response(200, result, "get all data books", res);
  });

  // const sql = `SELECT * FROM books WHERE category_id=${id}`;
  // db.query(sql, (err, result) => {
  //   if (err) response(400, "Error", err, res);
  //   if (!result.length)
  //     response(400, "Not Found", "category_id not found", res);
  //   response(200, result, "Show all books by Category ID", res);
  // });
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
    const { name } = req.body;
    const id = req.params.id;
    const sql = `UPDATE categories SET name='${name}' WHERE id=${id}`;
    db.query(sql, (err, fields) => {
      if (err) response(500, "failed insert data", err, res);
      if (fields?.affectedRows) {
        const data = {
          isSuccess: fields.affectedRows,
          id: id,
          name: name,
        };
        response(200, data, "successfully updated category", res);
      }
    });
  })
  .delete((req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM categories WHERE id= ${id}`;
    db.query(sql, (err, fields) => {
      if (err) response(500, "failed insert data", err, res);
      if (fields?.affectedRows) {
        const data = {
          isSuccess: fields.affectedRows,
          message: `deleted category with id : ${id}`,
        };
        response(200, data, "successfully updated category", res);
      }
    });
  });

////MIDLEWARE
// router.param("id", (req, res, next, id) => {
//   console.log(id);
//   next();
// });

module.exports = router;
