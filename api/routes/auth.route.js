const authBuilder = require("../controllers/auth.controller");
module.exports = (app) => {
  app
    .route("/signIn/google")
    .get(authBuilder.signIn_google)
};
