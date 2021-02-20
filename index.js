const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/index.js');
// const resolvers = require('./graphql/resolvers'); is also fine because it first detects index.js 
const {MONGODB} = require('./config.js');


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
