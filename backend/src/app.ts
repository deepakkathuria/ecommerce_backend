const path = require("path");
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app: any = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use("/public/uploads", express.static(process.cwd() + "/public/uploads"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export {};
