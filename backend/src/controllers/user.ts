const sql = require("../models/db");
const jwt = require("jsonwebtoken");

export const getUser = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `select * from users where user_id=${userId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ rows });
    }
  );
};

export const updateUser = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  const { name, email } = req.body;

  sql.query(
    `UPDATE users SET name=?, email=? where user_id=?`,
    [name, email, userId],
    (error: any, result: any) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "User info updated succesfully !", data: result });
    }
  );
};

export const uploadFile = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  try {
    if (req.file) {
      sql.query(
        `update users set avatar="${req.file.path}" where user_id=${userId}`,
        (error: any, result: any) => {
          if (error) throw error;
          res.status(200);
        }
      );
      console.log(req.file);
      // res.status(200).json({ image: req.file });
    } else {
      res.status(400).send({
        status: false,
        data: "File not found",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
