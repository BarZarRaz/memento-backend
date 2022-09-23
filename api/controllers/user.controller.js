const mongoose = require("mongoose");
const User = mongoose.model("user");

exports.list_all_users = (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

exports.create_a_user = (req, res) => {
  const user = {...req.body, createdTime: new Date()}
  const newuser = new User(user);
  console.log (user);
  newuser.save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.read_a_user = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update_a_user = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.delete_a_user = (req, res) => {
  User.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "user succesfully deleted",
      _id: req.params.userId,
    });
  });
};