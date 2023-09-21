const { ClientError } = require('../utils/clientError');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({path:'src/config/.env'});

const isAuthenticatedUser = (req, res, next)=>{
    const { token } = req.cookies;
    if(!token) throw new ClientError('Login first to access this resource', 401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
};

module.exports = { isAuthenticatedUser };