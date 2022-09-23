const mongoose = require("mongoose");
const Task = mongoose.model("task");

exports.list_all_tasks = (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.create_a_task = (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const task = {...req.body, createdTime: new Date()}
  const newTask = new Task(task);
  newTask.save((err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.read_a_task = (req, res) => {
  Task.findById(req.params.taskId, (err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_a_task = (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    (err, task) => {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete_a_task = (req, res) => {
  Task.deleteOne({ _id: req.params.taskId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "task succesfully deleted",
      _id: req.params.taskId,
    });
  });
};
