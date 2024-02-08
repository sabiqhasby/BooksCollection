const express = require("express");
const router = express.Router();
const response = require("../response");
const db = require("../connection");

router.get("/", (req, res) => {
  const { title, sortByTitle, minYear, maxYear, minPage, maxPage } = req.query;

  let sql = "SELECT * FROM books WHERE 1=1";

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
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    image_url,
    release_year,
    price,
    total_page,
    category_id,
  } = req.body;

  const thickness =
    total_page <= 100 ? "tipis" : total_page <= 200 ? "sedang" : "tebal";

  const sql = `INSERT INTO books (title, description, image_url, release_year, price, total_page, thickness, category_id) VALUES ('${title}', '${description}', '${image_url}', ${release_year}, '${price}', ${total_page}, '${thickness}', ${category_id})`;
  db.query(sql, (err, fields) => {
    console.log(fields);
    if (err) response(500, "invalid", "Something went wrong", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Data added successfully", res);
    }
  });
});

router
  .route("/:id")
  .patch((req, res) => {
    const {
      title,
      description,
      image_url,
      release_year,
      price,
      total_page,
      category_id,
    } = req.body;
    const id = req.params.id;
    const thickness =
      total_page <= 100 ? "tipis" : total_page <= 200 ? "sedang" : "tebal";

    const sql = `UPDATE books SET title='${title}', description='${description}', image_url='${image_url}', release_year=${release_year}, price='${price}', total_page=${total_page}, thickness='${thickness}', category_id=${category_id} WHERE id=${id}`;
    db.query(sql, (err, fields) => {
      if (err) response(500, "invalid", "Something went wrong", res);
      if (fields?.affectedRows) {
        const data = {
          isSuccess: fields.affectedRows,
          message: fields.message,
        };
        response(200, data, "Data added successfully", res);
      }
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM books WHERE id=${id}`;

    db.query(sql, (err, fields) => {
      if (err) {
        console.log(err);
        response(404, "not found", "Book not found.", res);
      }
      if (fields?.affectedRows) {
        console.log(fields);
        const data = {
          isSuccess: fields.affectedRows,
          message: `book with id=${id} deleted`,
        };
        response(200, data, "Delete Successfully!", res);
      }
    });
  });

////MIDLEWARE
// router.param("id", (req, res, next, id) => {
//   console.log(id);
//   next();
// });

module.exports = router;
