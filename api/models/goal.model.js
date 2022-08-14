const mongoose = require('mongoose')

const { Schema } = mongoose

const goalSchema = new Schema(
    {
        title: {
            type: String,
            required: 'name cannot be blank'
        },
        image: {
            type: String,

        },
        description: {
            type: String,

        },
        tag: {
            type: String
        },
        finished: {
            type: Boolean
        },
        beginGoalTime: {
            type: Date
        },
        endGoalTime: {
            type: Date
        }
    },
    { collection: 'goal' }
)

module.exports = mongoose.model('goal', goalSchema)