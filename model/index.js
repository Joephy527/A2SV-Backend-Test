const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, requires: true, unique: true },
  description: { type: String, required: true, unique: true },
  dueDate: { type: Date, required: false },
});

module.exports = mongoose.model("Todo", TodoSchema);
