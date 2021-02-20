const post = require('../../models/post.js');

module.exports = {
    Query: {
        async getPosts(){
            try{
                // finds all post
                const post = await Post.find();
                return post;
            }catch(err){
                throw new Error(err);
            }
        }
        // sayHi: () => 'Hello World!'
    }
}