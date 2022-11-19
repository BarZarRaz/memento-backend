const mongoose = require("mongoose");
const User = mongoose.model("user");
const Task = mongoose.model("task");

exports.list_all_tasks = (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.create_a_task = async (req, res) => {
  const userId = req.params.userId;
  const task = { ...req.body, createdTime: new Date() };
  const newTask = new Task(task);
  newTask.save(async (err, task) => {
    if (err) res.send(err);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { tasks: task._id },
      },
      { new: true }
    );
    console.log(user);
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

exports.delete_a_task = async (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;
  Task.deleteOne({ _id: req.params.taskId }, async (err) => {
    if (err) res.send(err);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { tasks: taskId },
      },
      { new: true }
    );
    res.json({
      message: "task succesfully deleted",
      _id: req.params.taskId,
    });
  });
};
