const models              = require('../models');
const responseHelper      = require('../helpers/responseHelper');

var limit = 10;   // number of records per page
var offset = 0;

function pagination(data , page) {
    var pages = Math.ceil(data.count / limit);
    var is_last = pages == page;
    var is_first = 1 == page;
    var result = {};
    result.total = data.count;
    result.pages = pages;
    result.per_page = limit;
    result.current = page;
    result.next  = is_last ? null : page + 1;
    result.prev = is_first ? null : page - 1;
    result.is_first = is_first;
    result.is_last = is_last;
    return result;
}

function  create(res , params) {
    createWithCallback(res , params , function(data){
        res.status(201).send({success: true , data: data , message: "Successfully created."})
    });
}

function list(req, res , params) {
    var page = parseInt(req.query.page) || 1;      // page number
    offset = limit * (page - 1);
    params.body.limit = limit;
    params.body.offset = offset;
    console.log(JSON.stringify(params , null ,2));

    models[params.tableName].findAndCountAll(params.body).then(function(data) {
        res.status(200).send({success: true, data: data.rows, pagination: pagination(data , page)});
    }).catch(function (error) {
        console.log(JSON.stringify(error, null, 2));
        responseHelper.sendError(error, res);
    });
}

function retrieve(res , params) {
    return retrieveWithCallback(res , params , function(data) {
        if (!data)
            return responseHelper.notFound(res);
        return res.status(200).send({success: true, data: data});
    });
}

function retrieveWithCallback(res , params , callback) {
    console.log(JSON.stringify(params , null ,2));
    return models[params.tableName].findOne(params.body).then(callback).catch(function(error){
        console.log(JSON.stringify(error , null ,2));
        responseHelper.sendError(error,res)
    });
}
function createWithCallback(res , params , callback) {
    console.log(JSON.stringify(params , null ,2));
    return models[params.tableName].create(params.body).then(callback).catch(function(error){
        console.log(JSON.stringify(error , null ,2));
        responseHelper.sendError(error,res)
    });
}

function update(res, params)
{
    return models[params.tableName].findOne(params.condition).then(function(data)
    {
        if (!data){
            return responseHelper.notFound(res);
        }else {
            data.updateAttributes(params.body).then(function(result){
                if (!result) {
                    return responseHelper.notFound(result);
                }
                return res.status(200).send({success: true , data: result , message: "Successfully Updated."});
            }).catch(function(error){
                console.log(JSON.stringify(error , null ,2));
                responseHelper.sendError(error,res)
            });
        }
    }).catch(function(error){
        console.log(JSON.stringify(error , null ,2));
        responseHelper.sendError(error,res)
    });
}

function destroy(res , params) {
    return models[params.tableName].destroy(params.condition).then(function(data) {
        return res.status(204).send({success: true , message: "Successfully Deleted."});
    }).catch(function(error){
        console.log(JSON.stringify(error , null ,2));
        return responseHelper.sendError(error,res)
    });
}

module.exports = {
    sendError: responseHelper.sendError,
    notFound: responseHelper.notFound,
    models: models,
    create: create,
    list: list,
    retrieve: retrieve,
    update: update,
    destroy: destroy,
    retrieveWithCallback: retrieveWithCallback,
    createWithCallback: createWithCallback
};