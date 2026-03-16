require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 3000;

// use EJS for pages
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static("public"));

// homepage route
app.get("/", (req, res) => {
  res.render("index");
});

// start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
