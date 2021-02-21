const postsResolvers = require('./posts.js');
const usersResolvers = require('./users.js');
const commentResolvers = require('./comment.js');

module.exports = {
    Post: {
        likeCount(parent){
            console.log(parent);
            return parent.likes.length;
        },
        commentCount: (parent) => parent.comments.length
    },
    Query :{
        ...postsResolvers.Query,
        ...usersResolvers.Query
    },
    Mutation : {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}