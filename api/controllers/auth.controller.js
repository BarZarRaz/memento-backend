const mongoose = require("mongoose");

exports.signIn_google = (req, res) => {
    User.find({}, (err, users) => {
      if (err) res.send(err);
      res.json(users);
    });
  };