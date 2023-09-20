const errorHandler =(err, req, res, next)=>{
    let statusCode = 500;
    let customMessage = 'Internal server error';
    let errors=err.message;

    //Custom errors
    if(err.name==='SequelizeConnectionRefusedError'){
        customMessage='Database connection refused, please check database server';
    }

    res.status(statusCode).json({
        success:false,
        message:customMessage,
        errors:errors,
    })
};

module.exports ={
    errorHandler,
}