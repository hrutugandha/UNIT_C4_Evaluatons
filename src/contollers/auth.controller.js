const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({user}, process.env.NODE_ENV )
}

const register = async(req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user){
            user = await User.create(req.body);

            return res.status(201).send(user)
        }
        return res.status(400).send({message:"User already exists",})

    }catch(err){
        return res.status(404).send({message: err.message});
    }
};


const login = async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(404).send({message:"wrong email or password!"})
        }

        const match = user.verifyPassowrd(req.body.passowrd);

        if(!match){
            return res.status(404).send({message:"wrong email or password"})
        }

        const token = generateToken(user);
        return res.status(200).send({user,token})

    }catch(err){
        return res.status(404).send({message: err.message});
    }
}

module.exports = {register,login};