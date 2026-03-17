require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const authController = require("./controllers/auth"); // import auth routes
const awardeesController = require("./controllers/awardees"); // import awardees routes
const passUserToView = require("./middleware/pass-user-to-view"); 
const Awardee = require("./models/Awardee");

// connect to MongoDB - connect my app to the database
mongoose.connect(process.env.MONGODB_URI);

// confirm database connection
mongoose.connection.on("connected", () => { 
  console.log(`Connected to MongoDB ${mongoose.connection.name}`); 
}); 

// use EJS for pages
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static("public")); // allows the browser to load CSS, images, and JS files.

// session middleware
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// after sessions run, make user available to all EJS views
app.use(passUserToView);

// auth routes
app.use("/auth", authController);

// awardee routes
app.use("/awardees", awardeesController);

// homepage route
app.get("/", async (req, res) => {
  // get all awardees so visitors can see them on the landing page
  const awardees = await Awardee.find({});

  res.render("index", { awardees });
});

// start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
