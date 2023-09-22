const User = require('../models/User');
const bcrypt = require('bcrypt');
const { catchAsyncErrors } = require('../middlewares/catchAsync');
const { ClientError } = require('../utils/clientError');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({path:'src/config/.env'});
const op = require('sequelize').Op;
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

const registerUser = catchAsyncErrors(async(req, res, next)=>{

    const { name, email, password, profile, imageUrl }= req.body;

        const existingUser = await User.findOne({where:{email:email}});
        if(existingUser){
            return next(new ClientError('User already exists, cannot create a user with this email', 409));
        }

        //encrypt password before create           
        let hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            profile,
            imageUrl,
        });
        return res.status(201).json({message:'User registered successfully', user:newUser});  
});

const loginUser = catchAsyncErrors(async(req,res, next)=>{
    const { email, password } = req.body;

    const user = await User.findOne({where:{email:email, isActive:true}});

    if(!user) return next(new ClientError('User not found', 401));

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid) return next(new ClientError('Wrong password',401));

    //if user email and password are correct a new token is generated
    const token = jwt.sign({userId:user.id}, process.env.SECRET_KEY, {expiresIn:'1h'});
    res.cookie('token', token, {httpOnly:true, maxAge:3600000});

    return res.status(200).json({message:'User successfully logged in'});

});

const logoutUser = catchAsyncErrors(async(req, res, next)=>{
    res.clearCookie('token');
    return res.status(200).json({message:'User logged out'});
});

const getUserInfo = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findByPk(req.user.userId,{
        attributes:['name', 'email', 'profile']
    });

    return res.status(200).json({
        message:'User found',
        user
    })
});

const updateUserProfile = catchAsyncErrors(async(req, res, next)=>{
    const { newName, newEmail } = req.body;
    let user = await User.findByPk(req.user.userId);

    if(newEmail){
        //check if other user exists with this email
        const userWithEmail = await User.findOne({
            where:{
                email:newEmail,
                id:{[op.not]:req.user.userId}
            }
        });
        if(userWithEmail) return next(new ClientError('Another user has this email, cannot update', 409));

        user.email = newEmail;
    }

    if(newName){
        user.name = newName;
    }

    await user.save();

    return res.status(200).json({message:'Data updated successfully'});
});

const forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const { email } = req.body;

    const user = await User.findOne({where:{email:email, isActive:true}});

    if(!user) return next(new ClientError('User not found with this email'));

    const resetToken =  user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:4000/api/v1/passwordReset/${resetToken}`;

    const message = `Click here to reset yout password: \n\n${resetUrl}`;

    await sendEmail({
        email:user.email,
        subject: "POS System password recovery",
        message
    });

    return res.status(200).json({success:true, message:`Email sent to: ${user.email}`});
});

const changePassword = catchAsyncErrors(async(req, res, next)=>{
    const { resetToken } = req.params;

    const { newPassword, confirmNewPassword } = req.body;

    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({where:{
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: {[op.gt]: Date.now()}
    }});

    if(!user) return next(new ClientError('token is invalid or has been expired'));

    if(newPassword !== confirmNewPassword) return next(new ClientError('Passwords do not match'));
    
    //encrypt password before update user            
    let hashedPassword = await bcrypt.hash(newPassword,10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    return res.status(200).json({message:'Password changed successfully'});
});

const updatePassword = catchAsyncErrors(async(req, res, next)=>{
    //change password from inside the app
    const user = await User.findByPk(req.user.userId);

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if(!isMatched) return next(new ClientError('Old password is incorrect', 400));

    if(newPassword !== confirmNewPassword) return next(new ClientError('Passwords do not match', 400));

    let hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    //if the password has successfully changed a new token is generated
    const token = jwt.sign({userId:user.id}, process.env.SECRET_KEY, {expiresIn:'1h'});
    res.cookie('token', token, {httpOnly:true, maxAge:3600000});

    return res.status(200).json({message:'Password updated successfully'});
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserInfo,
    updateUserProfile,
    forgotPassword,
    changePassword,
    updatePassword,
}