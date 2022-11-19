const mongoose = require("mongoose");
const User = mongoose.model("user");
const Question = mongoose.model("question");

exports.list_all_questions = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) res.send(err);
    res.json(questions);
  });
};

exports.create_a_question = async (req, res) => {
  const userId = req.params.userId;
  const question = { ...req.body, createdTime: new Date() };
  const newQuestion = new Question(question);
  newQuestion.save(async (err, question) => {
    if (err) res.send(err);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { questions: question._id },
      },
      { new: true }
    );
    console.log(user);
    res.json(question);
  });
};

exports.read_a_question = (req, res) => {
  Question.findById(req.params.questionId, (err, question) => {
    if (err) res.send(err);
    res.json(question);
  });
};

exports.update_a_question = (req, res) => {
  Question.findOneAndUpdate(
    { _id: req.params.questionId },
    req.body,
    { new: true },
    (err, question) => {
      if (err) res.send(err);
      res.json(question);
    }
  );
};

exports.delete_a_question = async (req, res) => {
  const userId = req.params.userId;
  const QuestionId = req.params.questionId;
  Question.deleteOne({ _id: req.params.questionId }, async (err) => {
    if (err) res.send(err);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { questions: QuestionId },
      },
      { new: true }
    );
    res.json({
      message: "Question succesfully deleted",
      _id: req.params.questionId,
    });
  });
};
