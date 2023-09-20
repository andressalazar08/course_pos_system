const errorHandler =(err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    let customMessage = 'Internal server error';
    let errors=err.message;

    //Custom errors
    if(err.name==='SequelizeConnectionRefusedError'){
        customMessage='Database connection refused, please check database server';
    }

    res.status(err.statusCode).json({
        success:false,
        message:customMessage,
        errors:errors,
    })
};

module.exports ={
    errorHandler,
}