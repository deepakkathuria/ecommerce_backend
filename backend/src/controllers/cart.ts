const sql = require("../models/db");
const jwt = require("jsonwebtoken");

export const getCart = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;
  console.log(userId,"USERiDDETAILddd")

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
      `SELECT * FROM Cart WHERE user_id = ? AND id = ?`,
      [userId, item.id],
      (err: any, rows: any) => {
        if (err) {
          console.error("Error fetching cart item:", err);
          return res.status(500).json({ error: "Database error" });
        }
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO Cart (user_id, id, quantity, name, price, image) VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, item.id, item.quantity, item.name, item.price, item.image],
            (err: any) => {
              if (err) {
                console.error("Error inserting into cart:", err);
                return res.status(500).json({ error: "Failed to add item to cart" });
              }
            }
          );
        } else {
          sql.query(
            `UPDATE Cart SET quantity = ? WHERE id = ? AND user_id = ?`,
            [item.quantity, item.id, userId],
            (err: any) => {
              if (err) {
                console.error("Error updating cart item:", err);
                return res.status(500).json({ error: "Failed to update cart item" });
              }
            }
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
