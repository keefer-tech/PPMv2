const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { router } = require("./routes/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cookieParser())
  .use("/", router)
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const dbConnection = process.env.DB_URL || "mongodb://localhost/test";
// Set three properties to avoid deprecation warnings:
mongoose.connect(
  dbConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err)
      console.log(`Error connecting to database, server not running`, err);
    else console.log(`Connected to database: ${dbName}`);
    // listen here because its successful
    const server = app.listen(port, () => {
      console.log("listening on port:" + port);
    });
  }
);
// const server = app.listen(port, () => {
//   console.log("listening on port:" + port);
// });
