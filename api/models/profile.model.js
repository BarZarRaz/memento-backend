const mongoose = require('mongoose')

const { Schema } = mongoose

const profileSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        age: {
            type: Number,
            required: 'age cannot be blank'
        },
        profilePicture: {
            type: String
        },
       
    },
    { collection: 'profile'}
)

module.exports = mongoose.model('profile', profileSchema)