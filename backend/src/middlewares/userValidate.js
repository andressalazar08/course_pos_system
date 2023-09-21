const { ClientError } = require('../utils/clientError');

const newUserValidation = (req, res, next)=>{

    const { name, password, email } = req.body;
    
    if(!name) throw new ClientError('Name cannot be empty', 400);

    if(!password) throw new ClientError('Password cannot be empty', 400);

    //validate email here
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailRegex.test(email);

    if(!isValidEmail) throw new ClientError('Email is not valid');

    return next();
};

module.exports ={
    newUserValidation,
}