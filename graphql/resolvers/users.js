const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegularExpression , validateLoginInupt} = require('../../utils/validators.js');
const {SECRET_KEY} = require('../../config.js');
const User = require('../../models/User.js');
const { validate } = require('../../models/User.js');

generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY , { expiresIn:'1h' } );
}

module.exports = {
    Mutation : {

        async login(_,{username , password}){
            const {errors,valid} = validateLoginInupt(username , password);
            if(!valid){
                throw new UserInputError('Error',errors);
            }
            const user = await User.findOne({username});
            if(!user){
                errors.genral = 'User not found';
                throw new UserInputError('User not found',{errors});
            }

            const match = await bcrypt.compare(password,user.password);
            if(!match){
                error.genral = 'wrong Credientials';
                throw new UserInputError('Wrong Crendientials',{error});
            }
            const token = generateToken(user);
            return {
                ...user._doc,
                id : user._id,
                token
            };

        }
        ,

        async register(_,
            {registerInput : {username , password,confirmPassword,email}}
            ,context
            ,info
            ){
            //  Validate user data
            const {errors,valid} = validateRegularExpression(username , email,password,confirmPassword);
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }


            //  Make sure user doesnot already exist
            const userCheck = await User.findOne({username});
            if(userCheck){
                return new UserInputError( 'User Name is taken',{
                    errors:{
                        username: 'This username is taken'
                    }
                });
            }

            // hash password and create an auth token
            password = await bcrypt.hash(password,12);

            const newUser = User({
                username,
                password,
                email,
                createdAt : new Date().toDateString()
            });

            // saves in database
            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id : res._id,
                token
            };
        }
    },

    Query:{
        async getUsers(){
            try{
                const user = await User.find();
                return user;
            }catch(err){
                throw new Error(err);
            }
        }
    }
}