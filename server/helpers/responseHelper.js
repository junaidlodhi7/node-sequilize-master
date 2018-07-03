// Error handling
function sendError(err, res){
    var code = 422;
    if(typeof err == 'object' ){
        code = err.status || 422;
        if(err.name == "SequelizeHostNotFoundError")
        {
            res.status(code).send({status: code , success: false , message: 'DB Connection Issue.' , error: err});
        }else{
            res.status(code).send({status: code , success: false , message: err.message , error: err});
        }
    }else{
        res.status(code).send({status: code , success: false , message: err});
    }
}

function sendSuccess(res){

}

function notFound(res)
{
    res.status(404).send({success: false , message: 'Not Found'});
}

module.exports = {

    sendError: sendError,
    notFound: notFound
};