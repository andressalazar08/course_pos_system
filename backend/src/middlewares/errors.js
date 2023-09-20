const errorHandler =(err, req, res, next)=>{
    let statusCode = 500;
    let customMessage = 'Internal server error';
    let errors;

    res.status(statusCode).json({
        success:false,
        message:customMessage,
        errors:errors,
    })
};

module.exports ={
    errorHandler,
}