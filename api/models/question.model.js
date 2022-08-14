const mongoose = require('mongoose')

const { Schema } = mongoose

const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: 'question cannot be blank'
        },
        answer: [
            {
                text: {
                    type: String
                },
                answeredTime: {
                    type: Date
                }
            }
        ]
    },
    { collection: 'question'}
)

module.exports = mongoose.model('question', questionSchema)