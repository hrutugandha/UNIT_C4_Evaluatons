
require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.NODE_ENV ,(err,decoded) => {

            if(err) {
                return reject(err);
            }
            return resolve(decoded);
        })
    })
};


const authenticate = (req, res, next) =>{
    if(!req.headers.autorization) {
        return res.status(403).send({message:"authorization token not found"});
    }
    if(!req.headers.autorization.startswith("Bearer ")) {
        return res.status(403).send({message:"authorization token not found"});
    }

    const token = req.headers.authorization.trim().split(' ')[1];
    let decoded;

    try{
        decoded = await verifyToken(token);
    }catch(err){
        console.log(err)
        return res.status(400).send({message: "authorization token not found"})
    }

    console.log(decoded);
    req.user = decoded.user

    return next()
};

module.exports = authenticate;