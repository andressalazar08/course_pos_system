const { ClientError } = require('../utils/clientError');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({path:'src/config/.env'});
const { catchAsyncErrors } = require('../middlewares/catchAsync');
const User = require('../models/User');

const isAuthenticatedUser = (req, res, next)=>{
    const { token } = req.cookies;
    if(!token) throw new ClientError('Login first to access this resource', 401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
};

const authorizedProfile = catchAsyncErrors(async(req, res, next)=>{
        // console.log(req.user);
        //const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(req.user.userId);
        if(req.user.profile!=='admin'){
            throw new ClientError(`Profile [${req.user.profile}] is not allowed to access this resource`, 403);
        }
        next();
});

module.exports = { 
    isAuthenticatedUser,
    authorizedProfile,
 };