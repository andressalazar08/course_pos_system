const newUserValidation = (req, res, next)=>{

    const { name, password } = req.body;

    if(name){
        if(password){
            return next();
        }else{
            throw Error('Password cannot be empty');
        }
    }else{
        throw Error('Name cannot be empty');
    }

};

module.exports ={
    newUserValidation,
}