const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "name cannot be blank",
    },
    age: {
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    email: {
      type: String,
      required: "email cannot be blank",
    },
    provider: {
      type: String,
      enum: ["apple", "google", "facebook"],
    },
    createdTime: {
      type: Date,
    },
    lastLoginTime: {
      type: Date,
    },
    lastLogoutTime: {
      type: Date,
    },
    actions: [
      {
        type: Schema.Types.ObjectId,
        ref: "action",
      },
    ],
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "question",
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "note",
      },
    ],
    goals: [
      {
        type: Schema.Types.ObjectId,
        ref: "goal",
      },
    ],
    task: [
      {
        type: Schema.Types.ObjectId,
        ref: "task",
      },
    ],
  },
  { collection: "user" }
);

module.exports = mongoose.model("user", userSchema);
