const noteBuilder = require("../controllers/note.controller");
module.exports = (app) => {
  app
    .route("/users/:userId/note")
    .get(noteBuilder.list_all_notes)
    .post(noteBuilder.create_a_note);
  app
    .route("/users/:userId/note/:noteId")
    .get(noteBuilder.read_a_note)
    .put(noteBuilder.update_a_note)
    .delete(noteBuilder.delete_a_note);
};
