const mongoose = require("mongoose");

// blueprint for each user in the database
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// create the User model from the schema
const User = mongoose.model("User", userSchema);

// export it so other files can use it
module.exports = User;
