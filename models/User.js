const {model, Schema} = require('mongoose')

// not saying required here will call in graph ql
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt : String
});

module.exports = model('User',userSchema);