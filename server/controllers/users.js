const db         = require('../config/db');
var params       = {tableName: 'User' , body: {} , condition: {}};

function create(req, res) {

    params.body = {
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        email: req.body.email,
        passwordHash: req.body.password
    };
    return db.create(res,params);
}

function update(req,res) {
    params.condition = {where: { id: req.params.id} };
    params.body = {
        firstName: req.body.firstName,
        lastName:  req.body.lastName
    };
    return db.update(res , params);
}

function list(req , res){
    params.body = {order: [['createdAt', 'DESC']]};
    return db.list(req,res , params);
}

function retrieve(req , res) {
    params.condition = {where: {id: req.params.id}};
    return db.retrieve(res , params);
}

function destroy(req , res) {
    params.condition = {where: {id: req.params.id}};
    return db.destroy(res , params);
}

module.exports = {
    create: create,
    list: list,
    retrieve: retrieve,
    update:update,
    destroy: destroy
};