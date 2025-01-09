const sql = require("../models/db");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

export const signUp = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash: any) => {
    sql.query(
      `select * from users where email="${email}"`,
      (err: any, rows: any) => {
        if (err) throw err;
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO users (name, email, password)
                VALUES (
                    "${name}",
                    "${email}",
                    "${hash}"
                )`,
            (err: any, rows: any) => {
              if (err) throw err;
              res.json({
                status: 201,
                rows,
                message: "Your account has been succesfully created !",
              });
            }
          );
        } else {
          res.json({ status: 400, message: "This email already exist." });
        }
      }
    );
  });
};

export const signIn = (req: any, res: any) => {
  const { email, password } = req.body;

  // Validate Input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Parameterized Query to Prevent SQL Injection
  sql.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    (err: any, rows: any) => {
      if (err) {
        console.error("SQL Error:", err.message);
        return res.status(500).json({ message: "Internal server error." });
      }

      if (rows.length < 1) {
        return res.status(401).json({
          message: "Email or password is incorrect.",
          status: 401,
        });
      }

      // Compare Password
      bcrypt.compare(password, rows[0].password, (err: any, result: any) => {
        if (err) {
          console.error("Bcrypt Error:", err.message);
          return res.status(500).json({ message: "Internal server error." });
        }

        if (result) {
          // Generate JWT Token
          const token = jsonwebtoken.sign(
            { id: rows[0].user_id },
            process.env.ACCESS_TOKEN_SECRET || "default_secret",
            { algorithm: "HS256", expiresIn: "1h" }
          );

          return res.status(200).json({
            message: "You are logged in!",
            status: 200,
            token: token,
            user: {
              id: rows[0].user_id,
              name: rows[0].name,
              email: rows[0].email,
            },
          });
        } else {
          return res.status(401).json({
            message: "Email or password is incorrect.",
            status: 401,
          });
        }
      });
    }
  );
};
