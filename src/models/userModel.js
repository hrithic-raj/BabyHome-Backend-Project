const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    block: {type: Boolean, default: false},
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})
const User = mongoose.model("Users", userSchema);

module.exports = User;