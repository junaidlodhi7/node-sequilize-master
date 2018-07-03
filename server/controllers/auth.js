const db         = require('../config/db');
var params       = {tableName: 'User' , body: {}};

function login(req, res) {
    params.condition = { where: {email: req.body.email} };
    db.retrieveWithCallback(res , params , function(user){
        if(!user){
            return db.sendError('Authentication failed. User not exist.',res)
        }else{
            if(user.authenticate(req.body.password)){
                return res.status(200).send({success: true , user: user  , message: "Successfully login." ,token: user.generateJwtToken()});
            }
            return db.sendError({code: 401 , message: 'Authentication failed. Wrong Password.'},res);
        }
    });
}

module.exports = {
    login: login
};