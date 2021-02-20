const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config.js');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        console.log('============');
        // Bearer .....
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const userToken = jwt.verify(token,SECRET_KEY);
                return userToken;
            }catch(err){
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [Token]');
    }
    throw new Error('Authorization header must be provided');
}