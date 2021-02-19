const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/post.js');
const {MONGODB} = require('./config.js')

const typeDefs = gql`
    type Post{
        id : ID!
        body : String!
        createdAT : String!
        username : String!
    }
    type Query{
        getPosts : [Post]
        # sayHi:String!
    }
`;
const resolvers = {
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
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB,{useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true , useFindAndModify: false})
    .then(()=>{
        console.log('Mongodb connected');
        return server.listen({port:5000});
    }
    ).then((res) => {
        console.log(`Server running at ${res.url}`)
    }
    )

server.listen({port:5000}).then((res)=>{
    console.log(`Server running at ${res.url}`)
});
