require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;

//  connect to MongoDB - connect my app to the database
mongoose.connect(process.env.MONGODB_URI);

// confirm database connection
mongoose.connection.on("connected", () => { 
  console.log(`Connected to MongoDB ${mongoose.connection.name}`); 
}); 

// import auth routes
const authController = require("./controllers/auth");

// use EJS for pages
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
// allows the browser to load CSS, images, and JS files.
app.use(express.static("public"));

// session middleware
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// auth routes
app.use("/auth", authController);

// homepage route
app.get("/", (req, res) => {
  res.render("index");
});

// start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
