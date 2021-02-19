const {model,Schema, Mongoose} = require('mongoose');

const postSchema = new Schema({
    username : String,
    body : String,
    createdAT : String,
    comments : [
        {
            username : String,
            body : String,
            createdAT : String
        }
    ],
    likes : [
        {
            username : String,
            createdAT : String
        }
    ],
    user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    }
});

module.exports = model('Post',postSchema);