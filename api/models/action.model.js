const mongoose = require('mongoose')

const { Schema } = mongoose

const actionSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["goalCreated", "goalFinished", "goalFailed", "taskCreated", "taskDone", "questionCreated", "questionAnswered", "questionClosed", "death"]
        },
        tag: {
            type: String,
        },
        data: {
            type: String,
        }

    },
    { collection: 'action' }
)

module.exports = mongoose.model('action', actionSchema)