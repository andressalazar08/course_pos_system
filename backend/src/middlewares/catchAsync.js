const catchAsyncErrors = (controller)=>{
    return function(req, res, next){
        controller(req, res).catch((err)=>{
            next(err);//express default error handler
        })
    }
}

module.exports ={catchAsyncErrors};