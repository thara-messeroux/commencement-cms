require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// test route
app.get("/", (req, res) => {
  res.send("Commencement CMS is running!");
});

// start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
