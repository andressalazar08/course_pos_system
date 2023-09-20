const { ClientError } = require('../utils/clientError');

const newUserValidation = (req, res, next)=>{

    const { name, password } = req.body;

    if(name){
        if(password){
            return next();
        }else{
            throw new ClientError('Password cannot be empty', 400);
        }
    }else{
        throw new ClientError('Name cannot be empty', 400);
    }

};

module.exports ={
    newUserValidation,
}