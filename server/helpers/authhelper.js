require('dotenv').config();
const User    = require('../models').User;
const jwt     = require('jsonwebtoken');
const secret = process.env.SECRET;

function verifyJwtToken(req , res , next){
    if(req.headers && req.headers.authorization)
    {
        jwt.verify(req.headers.authorization,secret,function(err,decode){
            if(err) {
                req.user = undefined;
                next();
            }else {
                User.findOne({where: {email: decode.email, id: decode.id}}).then(function (user) {
                    if (!user) {
                        req.user = undefined;
                        next();
                    } else {
                        req.user = user;
                        next();
                    }
                }).catch(function (err) {
                    req.user = undefined;
                    next();
                });
            }
        });
    }
    else{
        req.user = undefined;
        next();
    }
}

function isAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ success: false , message: 'Unauthorized user!' });
    }
}

module.exports = {
    verifyJwtToken: verifyJwtToken,
    isAuthenticated: isAuthenticated
};