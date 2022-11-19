const mongoose = require("mongoose");
const User = mongoose.model("user");
const Note = mongoose.model("note");

exports.list_all_notes = (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) res.send(err);
    res.json(notes);
  });
};

exports.create_a_note = async (req, res) => {
  const userId = req.params.userId;
  const note = { ...req.body, noteTime: new Date() };
  const newnote = new Note(note);
  newnote.save(async (err, note) => {
    if (err) res.send(err);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { notes: note._id },
      },
      { new: true }
    );
    console.log(user);
    res.json(note);
  });
};

exports.read_a_note = (req, res) => {
  Note.findById(req.params.noteId, (err, note) => {
    if (err) res.send(err);
    res.json(note);
  });
};

exports.update_a_note = (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.noteId },
    req.body,
    { new: true },
    (err, note) => {
      if (err) res.send(err);
      res.json(note);
    }
  );
};

exports.delete_a_note = async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;
  Note.deleteOne({ _id: req.params.noteId }, async (err) => {
    if (err) res.send(err);
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { notes: noteId },
      },
      { new: true }
    );
    res.json({
      message: "Note succesfully deleted",
      _id: req.params.noteId,
    });
  });
};
