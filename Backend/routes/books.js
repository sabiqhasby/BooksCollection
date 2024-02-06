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
