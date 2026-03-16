const mongoose = require("mongoose");

// define what an awardee looks like in the database
const awardeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  degree: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  bio: {
    type: String,
  },

  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  } 
  
});

// create the model
const Awardee = mongoose.model("Awardee", awardeeSchema);

// export so controllers can use it
module.exports = Awardee;
