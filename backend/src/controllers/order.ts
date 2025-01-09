const sql = require("../models/db");
const jwt = require("jsonwebtoken");

export const createOrder = (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized access" });

  const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  const { total_amount, payment_method, order_status, transaction_id } = req.body;

  sql.query(
    `INSERT INTO orders (user_id, total_amount, payment_status, payment_method, order_status, transaction_id)
     VALUES (?, ?, 'pending', ?, ?, ?)`,
    [userId, total_amount, payment_method, order_status, transaction_id],
    (err: any, result: any) => {
      if (err) {
        console.error("Error creating order:", err);
        return res.status(500).json({ error: "Failed to create order" });
      }
      res.status(201).json({ message: "Order created successfully", orderId: result.insertId });
    }
  );
};






export const getUserOrders = (req: any, res: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized access" });
  
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;
  
    sql.query(
      `SELECT * FROM orders WHERE user_id = ?`,
      [userId],
      (err: any, rows: any) => {
        if (err) {
          console.error("Error fetching orders:", err);
          return res.status(500).json({ error: "Failed to fetch orders" });
        }
        res.status(200).json({ orders: rows });
      }
    );
  };
  




  export const getOrderDetails = (req: any, res: any) => {
    const { orderId } = req.params;
  
    sql.query(
      `SELECT * FROM orders WHERE order_id = ?`,
      [orderId],
      (err: any, rows: any) => {
        if (err) {
          console.error("Error fetching order details:", err);
          return res.status(500).json({ error: "Failed to fetch order details" });
        }
        res.status(200).json({ order: rows[0] });
      }
    );
  };
  




  export const updateOrderStatus = (req: any, res: any) => {
    const { orderId } = req.params;
    const { order_status } = req.body;
  
    sql.query(
      `UPDATE orders SET order_status = ? WHERE order_id = ?`,
      [order_status, orderId],
      (err: any) => {
        if (err) {
          console.error("Error updating order status:", err);
          return res.status(500).json({ error: "Failed to update order status" });
        }
        res.status(200).json({ message: "Order status updated successfully" });
      }
    );
  };
  



  export const deleteOrder = (req: any, res: any) => {
    const { orderId } = req.params;
  
    sql.query(
      `DELETE FROM orders WHERE order_id = ?`,
      [orderId],
      (err: any) => {
        if (err) {
          console.error("Error deleting order:", err);
          return res.status(500).json({ error: "Failed to delete order" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
      }
    );
  };
  
// --------------------------------addOrderAddress.toString[Symbol]....................


  export const addOrderAddress = (req: any, res: any) => {
    const { orderId } = req.params;
    const { full_name, phone_number, street_address, city, state, postal_code, country } = req.body;
  
    sql.query(
      `INSERT INTO address_orders (order_id, user_id, full_name, phone_number, street_address, city, state, postal_code, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderId, req.user.id, full_name, phone_number, street_address, city, state, postal_code, country],
      (err: any) => {
        if (err) {
          console.error("Error adding address:", err);
          return res.status(500).json({ error: "Failed to add address" });
        }
        res.status(201).json({ message: "Address added successfully" });
      }
    );
  };
  



  export const getOrderAddress = (req: any, res: any) => {
    const { orderId } = req.params;
  
    sql.query(
      `SELECT * FROM address_orders WHERE order_id = ?`,
      [orderId],
      (err: any, rows: any) => {
        if (err) {
          console.error("Error fetching order address:", err);
          return res.status(500).json({ error: "Failed to fetch address" });
        }
        res.status(200).json({ address: rows[0] });
      }
    );
  };
  


  export const updateOrderAddress = (req: any, res: any) => {
    const { addressId } = req.params;
    const { full_name, phone_number, street_address, city, state, postal_code, country } = req.body;
  
    sql.query(
      `UPDATE address_orders SET full_name=?, phone_number=?, street_address=?, city=?, state=?, postal_code=?, country=? WHERE address_id=?`,
      [full_name, phone_number, street_address, city, state, postal_code, country, addressId],
      (err: any) => {
        if (err) {
          console.error("Error updating address:", err);
          return res.status(500).json({ error: "Failed to update address" });
        }
        res.status(200).json({ message: "Address updated successfully" });
      }
    );
  };
  



  export const deleteOrderAddress = (req: any, res: any) => {
    const { addressId } = req.params;
  
    sql.query(
      `DELETE FROM address_orders WHERE address_id = ?`,
      [addressId],
      (err: any) => {
        if (err) {
          console.error("Error deleting address:", err);
          return res.status(500).json({ error: "Failed to delete address" });
        }
        res.status(200).json({ message: "Address deleted successfully" });
      }
    );
  };
  