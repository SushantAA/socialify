const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config.js');

module.exports = (context) => {
    const authHeader = context.req.header.authorization;
    if(authHeader){
        // Bearer .....
        const token = authHeader.split('Bearer')[1];
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
    throw new Error('Authentication header must be provided');
}