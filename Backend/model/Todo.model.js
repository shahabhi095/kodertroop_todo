const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: String,
    status: String,
  }
);

const todoModel = mongoose.model("addtodo", todoSchema);

module.exports={todoModel}