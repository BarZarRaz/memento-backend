const mongoose = require("mongoose");
const User = mongoose.model("user");
const Goal = mongoose.model("goal");

exports.list_all_goals = (req, res) => {
  Goal.find({}, (err, goals) => {
    if (err) res.send(err);
    res.json(goals);
  });
};

exports.create_a_goal = async (req, res) => {
  const userId = req.params.userId;
  const goal = { ...req.body, beginGoalTime: new Date() };
  const newgoal = new Goal(goal);
  newgoal.save(async (err, goal) => {
    if (err) res.send(err);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { goals: goal._id },
      },
      { new: true }
    );
    console.log(user);
    res.json(goal);
  });
};

exports.read_a_goal = (req, res) => {
  Goal.findById(req.params.goalId, (err, goal) => {
    if (err) res.send(err);
    res.json(goal);
  });
};

exports.update_a_goal = (req, res) => {
  Goal.findOneAndUpdate(
    { _id: req.params.goalId },
    req.body,
    { new: true },
    (err, goal) => {
      if (err) res.send(err);
      res.json(goal);
    }
  );
};

exports.delete_a_goal = async (req, res) => {
  const userId = req.params.userId;
  const goalId = req.params.goalId;
  Goal.deleteOne({ _id: req.params.goalId }, async (err) => {
    if (err) res.send(err);
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { goals: goalId },
      },
      { new: true }
    );
    res.json({
      message: "Goal succesfully deleted",
      _id: req.params.goalId,
    });
  });
};
