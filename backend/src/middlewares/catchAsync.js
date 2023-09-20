const catchAsyncErrors = (controller)=>{
    return function(req, res, next){
        controller(req, res, next).catch((err)=>{
            next(err);//express default error handler
        })
    }
}

module.exports ={catchAsyncErrors};