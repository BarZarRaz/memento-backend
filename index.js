const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

global.Task = require("./api/models/task.model");
global.User = require("./api/models/user.model");
global.Goal = require("./api/models/goal.model");
global.Note = require("./api/models/note.model");
global.Action = require("./api/models/action.model");
global.Question = require("./api/models/question.model");

const userRoute = require("./api/routes/user.route");
const taskRoute = require("./api/routes/task.route");
const authRoute = require("./api/routes/auth.route");
const questionRoute = require("./api/routes/question.route");
const noteRoute = require("./api/routes/note.route");
const goalRoute = require("./api/routes/goal.route");

mongoose.connect(
  "mongodb+srv://djfrosterice:Ice37872@cluster0.w8kqktk.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const port = process.env.port || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

goalRoute(app);
noteRoute(app);
questionRoute(app);
authRoute(app);
userRoute(app);
taskRoute(app);

app.route("/").get((req, res) => {
  res.send("Hello World!");
});
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
