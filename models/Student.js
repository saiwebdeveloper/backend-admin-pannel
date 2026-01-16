const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  hallticket: String,
  name: String,
  marks: Number
});

module.exports = mongoose.model("Student", StudentSchema);
