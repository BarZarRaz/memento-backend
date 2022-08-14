const mongoose = require('mongoose')

const { Schema } = mongoose

const noteSchema = new Schema(
    {
        noteText: {
            type: String,
            required: 'noteText cannot be blank'
        },
        noteImage: {
            type: String
        },
        noteTime: {
            type: Date
        }
    },
    { collection: 'note'}
)

module.exports = mongoose.model('note', noteSchema)