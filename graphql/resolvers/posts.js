const {AuthenticationError, UserInputError} = require('apollo-server');

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

            if(args.body.trim()==''){
                throw new Error('Post body must not be empty');
            }

            console.log(user);

            const newPost = new Post({
                body,
                user: user.indexOf,
                username: user.username,
                createdAt: new Date().toDateString()
            });
            
            const post = await newPost.save();

            context.pubsub.publish('NEW_POST',{
                newPost: post
            }); 

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
        },

        async likePost(_,{postId},context){
            const {username} = checkAuth(context);

            const post = await Post.findById(postId);

            if(post){
                console.log(post.likes);
                if( post.likes.find((like) => like.username === username)){
                    post.likes = post.likes.filter((like)=>like.username!== username);
                }else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }
                await post.save();
            }else {
                throw new UserInputError('Post not found');
            }

            return post;
        }

    },

    Subscription:{
        newPost:{
            subscribe:(_,__,{pubsub})=>pubsub.asyncIterator('NEW_POST')
        }
    }
}