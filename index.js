const express = require("express");
const mongoose = require("mongoose");
const app = express();
const todo = require("./model");
const dotenv = require("dotenv");

app.use(express.json());

dotenv.config({ path: __dirname + "/.env" });

mongoose.connect(process.env.MONGODB_URL);

app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await todo.find();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const aTask = await todo.findById(req.params.id);
    if (aTask) {
      res.json(aTask);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new todo(req.body);
    const savedTodo = await newTask.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await todo.findByIdAndDelete(req.params.id);
    if (deletedTask) {
      res.json({
        message: `Todo with ID ${req.params.id} deleted successfully.`,
      });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
