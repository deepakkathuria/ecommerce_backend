const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app: any = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3001;
app.listen(port, "0.0.0.0");

export {};
