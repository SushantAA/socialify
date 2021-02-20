const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = require('../../config.js');
const User = require('../../models/User.js');

module.exports = {
    Mutation : {
        async register(_,
            {registerInput : {username , email,password,confirmPassword}}
            ,context
            ,info
            ){
            // TODO: Validate user data
            // TODO: Make sure user doesnot already exist
            // TODO: hash password and create an auth token
            password = await bcrypt.hash(password,12);

            const newUser = User({
                username,
                password,
                email,
                createdAt : new Date().toDateString()
            });

            // saves in database
            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res,username
            }, SECRET_KEY , { expiresIn:'1h' } );

            return {
                ...res._doc,
                id : res._id,
                token
            };
        }
    }
}