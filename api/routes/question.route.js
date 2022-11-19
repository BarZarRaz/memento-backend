const questionBuilder = require("../controllers/question.controller");
module.exports = (app) => {
  app
    .route("/users/:userId/question")
    .get(questionBuilder.list_all_questions)
    .post(questionBuilder.create_a_question);
  app
    .route("/users/:userId/question/:questionId")
    .get(questionBuilder.read_a_question)
    .put(questionBuilder.update_a_question)
    .delete(questionBuilder.delete_a_question);
};
