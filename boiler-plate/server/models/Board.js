const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true
  },
  mkDate: String,
  category: Number,
  title: String,
  contents: String,
  isSecret: Number,
  password: {
    type: Number,
    minlength: 4
  }
});

const Board = mongoose.model("Board", boardSchema);
module.exports = { Board };
