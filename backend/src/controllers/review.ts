const sql = require("../models/db");
const jwt = require("jsonwebtoken");

export const getReviews = (req: any, res: any) => {
  sql.query("SELECT * from customer_reviews", (err: any, rows: any) => {
    if (err) throw err;
    res.json({ status: 200, rows });
  });
};

export const getReviewById = (req: any, res: any) => {
  const productId = req.params.id;
  sql.query(
    `SELECT customer_reviews.*, users.name, users.avatar FROM customer_reviews INNER JOIN users ON customer_reviews.user_id = users.user_id WHERE customer_reviews.product_id=${productId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ status: 200, rows });
    }
  );
};

export const createReview = (req: any, res: any) => {
  const { product_id, rating, title, content } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `SELECT * FROM customer_reviews WHERE user_id = ${userId} AND product_id = ${product_id}`,
    (err: any, result: any) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(400).json({
          error: "You have already submitted a review for this product",
          status: 400,
        });
      }
      sql.query(
        `INSERT INTO customer_reviews(user_id, product_id, title, content, rating) VALUES (${userId},${product_id},"${title}","${content}",${rating})`
      );
      res
        .status(201)
        .json({ message: "Review successfully submitted", status: 201 });
    }
  );
};
