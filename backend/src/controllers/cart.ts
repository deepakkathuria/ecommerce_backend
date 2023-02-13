const sql = require("../models/db");
const jwt = require("jsonwebtoken");

export const getCart = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `select * from Cart where user_id=${userId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ cartItems: rows });
    }
  );
};

export const addToCart = (req: any, res: any) => {
  const { items } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  items.map((item: any) => {
    sql.query(
      `select * from Cart where user_id=${userId} and id=${item.id}`,
      (err: any, rows: any) => {
        if (err) throw err;
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO Cart (user_id, id, quantity, name, price, image) VALUES (${userId}, ${item.id}, ${item.quantity}, "${item.name}", ${item.price}, "${item.image}")`
          );
        } else {
          sql.query(
            `update Cart set quantity = ${item.quantity} where id=${item.id} and user_id=${userId}`
          );
        }
      }
    );
  });

  res.json({ cartItems: items });
};

export const removeFromCart = (req: any, res: any) => {
  const productId = req.params.product_id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `delete from Cart where user_id=${userId} and id=${productId}`,
    (err: any, rows: any) => {
      if (err) {
        throw err;
      } else {
        res.status(204).json({ message: "Item succesfully deleted." });
      }
    }
  );
};

export const clearCart = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `delete from Cart where user_id=${userId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.status(204).json({ message: "Cart is clear.", data: rows });
    }
  );
};
