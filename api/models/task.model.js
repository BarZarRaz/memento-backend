const mongoose = require('mongoose')

const { Schema } = mongoose

const taskSchema = new Schema(
    {
        task: {
            type: String,
            required: 'name cannot be blank'
        },
        tag: {
            type: String
        },
        finished: {
            type: Boolean
        },
        due: {
            type: Date,
            required: 'due cannot be blank'
        },
        taskImage: [
            {
              type: String,
            },
        ],
    },
    { collection: 'task'}
)

module.exports = mongoose.model('task', taskSchema)