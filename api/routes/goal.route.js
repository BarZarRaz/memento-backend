const goalBuilder = require("../controllers/goal.controller");
module.exports = (app) => {
  app
    .route("/users/:userId/goal")
    .get(goalBuilder.list_all_goals)
    .post(goalBuilder.create_a_goal);
  app
    .route("/users/:userId/goal/:goalId")
    .get(goalBuilder.read_a_goal)
    .put(goalBuilder.update_a_goal)
    .delete(goalBuilder.delete_a_goal);
};
