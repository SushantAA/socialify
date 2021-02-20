const post = require('../../models/post.js');
const checkAuth = require('../../utils/checkAuth.js');

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
        },

        async getPost(_,{postId}){
            try{
                const post = await Post.findById(postId);
                if(post){
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            }catch(err){
                throw new Error(err);
            }
        }

        // sayHi: () => 'Hello World!'
    },
    Mutation : {
        async createPost(_,{body},context){
            const user = checkAuth(context);
            
            console.log(user);

            const newPost = new Post({
                body,
                user: user.indexOf,
                username: user.username,
                createdAt: new Date().toDateString()
            });
            
            const post = await newPost.save();

            return post;
        }
    }
}