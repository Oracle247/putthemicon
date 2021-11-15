const mongoose = require('mongoose')
const Schema = mongoose.Schema



const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    lga: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    pic: {
        type: String
        // required: true
    }

}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User
