const sql = require("../models/db");

export const getProducts = (req: any, res: any) => {
  sql.query(
    `SELECT products.*, AVG(customer_reviews.rating) as avg_rating
    FROM products
    LEFT JOIN customer_reviews
    ON products.item_id = customer_reviews.product_id
    GROUP BY products.item_id`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ status: 200, rows });
    }
  );
};

export const getProductById = (req: any, res: any) => {
  const productId = req.params.id;
  sql.query(
    `SELECT * from products WHERE item_id=${productId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ status: 200, rows });
    }
  );
};

export const getProductByCategory = (req: any, res: any) => {
  const productCategory = req.params.category;
  sql.query(
    `SELECT products.*, AVG(customer_reviews.rating) as avg_rating, COUNT(customer_reviews.rating) as ratings_length
    FROM products
    LEFT JOIN customer_reviews
    ON products.item_id = customer_reviews.product_id
    WHERE products.category="${productCategory}"
    GROUP BY products.item_id`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ status: 200, rows });
    }
  );
};
