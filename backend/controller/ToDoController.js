const ToDoModel = require("../models/ToDoModel");

class ToDoController {
  async getToDos(req, res) {
    try {
      const toDos = await ToDoModel.find();
      res.send(toDos);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err, msg: "Internal Server Error" });
    }
  }

  async saveToDo(req, res) {
    try {
      const { toDo } = req.body;
      const data = await ToDoModel.create({ toDo });
      console.log("Saved Successfully...");
      res.status(201).send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
  }

  async updateToDo(req, res) {
    try {
      const { id } = req.params;
      const { toDo } = req.body;
      await ToDoModel.findByIdAndUpdate(id, { toDo });
      res.send("Updated Successfully....");
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
  }

  async completeToDo(req, res) {
    try {
      const { id } = req.params;
      await ToDoModel.findByIdAndUpdate(id, { completed: true });
      res.send("Marked as Complete Successfully....");
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
  }

  async deleteToDo(req, res) {
    try {
      const { id } = req.params;
      await ToDoModel.findByIdAndDelete(id);
      res.send("Deleted Successfully....");
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    }
  }
}

module.exports = new ToDoController();
