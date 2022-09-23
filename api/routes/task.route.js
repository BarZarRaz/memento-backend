const taskBuilder = require("../controllers/task.controller");
module.exports = (app) => {
  app
    .route("/users/:userId/tasks")
    .get(taskBuilder.list_all_tasks)
    .post(taskBuilder.create_a_task);
  app
    .route("/users/:userId/tasks/:taskId")
    .get(taskBuilder.read_a_task)
    .put(taskBuilder.update_a_task)
    .delete(taskBuilder.delete_a_task);
};
