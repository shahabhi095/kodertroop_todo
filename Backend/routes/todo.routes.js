const express = require("express");
const { todoModel } = require("../model/Todo.model");
const todoRouter = express.Router();

//get todo
todoRouter.get("/todo", async (req, res) => {
  try {
    const todoData = await todoModel.find();
    console.log(todoData);
    res.send(todoData);
  } catch (err) {
    console.log(err);
  }
});

//search todo
todoRouter.get("/todo/search", async (req, res) => {
  const query = req.query.q;

  try {
    const result = await todoModel.aggregate([
      {
        $search: {
          index: "title",
          text: {
            query: query,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//create todo
todoRouter.post("/create", async (req, res) => {
  try {
    const todo = new todoModel(req.body);
    await todo.save();
    res.send({ message: "Task addeded successfully" });
  } catch (err) {
    res.send({ message: "Something went wrong", error: err.message });
    console.log(err);
  }
});

//update todo
todoRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await todoModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ message: "Updated successfully" });
  } catch (err) {
    res.send({ message: "Something went wrong", error: err.message });
    res.send();
  }
});

//delete todo
todoRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await todoModel.findByIdAndDelete({ _id: id });
    res.send({ message: "Deleted successfully" });
  } catch (err) {
    res.send({ message: "Something went wrong", error: err.message });
    res.send();
  }
});

module.exports = { todoRouter };
