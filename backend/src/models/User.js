const { Schema, model } = require('mongoose');

const User = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    roles: [{type: String, ref: 'Role'}],
    createdAt: {type: Date, default: Date.now}
})

module.exports = model('User', User)