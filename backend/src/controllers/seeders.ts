// const sql = require("../models/db");
// const bcrypt = require('bcrypt')
// ;

// export const seedDatabase = async (req: any, res: any) => {
//   try {
//     // Seed Admin User
//     const adminPassword = await bcrypt.hash("admin123", 10);
//     sql.query(
//       `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
//       ["Admin User", "admin@example.com", adminPassword],
//       (err: any, rows: any) => {
//         if (err) throw err;
//       }
//     );

//     // Seed Test User
//     const testPassword = await bcrypt.hash("test123", 10);
//     sql.query(
//       `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
//       ["Test User", "testuser@example.com", testPassword],
//       (err: any, rows: any) => {
//         if (err) throw err;
//       }
//     );

//     // Seed Products
//     sql.query(
//       `INSERT INTO products (name, price, category) VALUES (?, ?, ?), (?, ?, ?)`,
//       [
//         "Headphones Model A", 199, "headphones",
//         "Headphones Model B", 299, "headphones"
//       ],
//       (err: any, rows: any) => {
//         if (err) throw err;
//       }
//     );

//     // Seed Cart for Admin User
//     sql.query(
//       `INSERT INTO Cart (user_id, id, quantity, name, price, image) VALUES (?, ?, ?, ?, ?, ?)`,
//       [1, 1, 2, "Headphones Model A", 199, "image_url"],
//       (err: any, rows: any) => {
//         if (err) throw err;
//       }
//     );

//     res.status(201).json({
//       message: "Database seeded successfully with users, products, and cart data.",
//     });
//   } catch (error) {
//     console.error("Seeding error:", error);
//     res.status(500).json({ message: "Failed to seed database." });
//   }
// };
const sql = require("../models/db");
const bcrypt = require('bcrypt')

export const seedDatabase = async (req: any, res: any) => {
  try {
    // Seed Admin User
    const adminPassword = await bcrypt.hash("admin123", 10);
    sql.query(
      `SELECT * FROM users WHERE email = ?`,
      ["admin@example.com"],
      (err: any, rows: any) => {
        if (err) throw err;
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            ["Admin User", "admin@example.com", adminPassword],
            (err: any) => {
              if (err) throw err;
            }
          );
        }
      }
    );

    // Seed Test User
    const testPassword = await bcrypt.hash("test123", 10);
    sql.query(
      `SELECT * FROM users WHERE email = ?`,
      ["testuser@example.com"],
      (err: any, rows: any) => {
        if (err) throw err;
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            ["Test User", "testuser@example.com", testPassword],
            (err: any) => {
              if (err) throw err;
            }
          );
        }
      }
    );

    // Seed Products
    sql.query(
      `SELECT * FROM products WHERE name = ?`,
      ["Headphones Model A"],
      (err: any, rows: any) => {
        if (err) throw err;
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO products (name, price, category) VALUES (?, ?, ?)`,
            ["Headphones Model A", 199, "headphones"],
            (err: any) => {
              if (err) throw err;
            }
          );
        }
      }
    );

    sql.query(
      `SELECT * FROM products WHERE name = ?`,
      ["Headphones Model B"],
      (err: any, rows: any) => {
        if (err) throw err;
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO products (name, price, category) VALUES (?, ?, ?)`,
            ["Headphones Model B", 299, "headphones"],
            (err: any) => {
              if (err) throw err;
            }
          );
        }
      }
    );

    // Seed Cart for Admin User
    sql.query(
      `SELECT * FROM Cart WHERE user_id = ? AND id = ?`,
      [1, 1],
      (err: any, rows: any) => {
        if (err) throw err;
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO Cart (user_id, id, quantity, name, price, image) VALUES (?, ?, ?, ?, ?, ?)`,
            [1, 1, 2, "Headphones Model A", 199, "image_url"],
            (err: any) => {
              if (err) throw err;
            }
          );
        }
      }
    );

    res.status(201).json({
      message: "Database seeded successfully with users, products, and cart data.",
    });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ message: "Failed to seed database." });
  }
};
