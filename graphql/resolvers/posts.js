const {AuthenticationError} = require('apollo-server');

const Post = require('../../models/post.js');
const checkAuth = require('../../utils/checkAuth.js');

module.exports = {
    Query: {
        async getPosts(){
            try{
                // finds all post
                // descendign order
                const post = await Post.find().sort({createdAt:-1});
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
        },

        async deletePost(_,{postId},context){
            const user = checkAuth(context);
                console.log(user.username);
                console.log(user.username);
                console.log(' = username');
                // console.log(postId)
            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post deleted successfully';
                }else{
                    throw new AuthenticationError('Action not allowed');
                }
            } catch(err){
                throw new Error(err);
            }
        }

    }
}