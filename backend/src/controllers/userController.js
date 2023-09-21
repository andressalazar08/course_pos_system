const User = require('../models/User');
const bcrypt = require('bcrypt');
const { catchAsyncErrors } = require('../middlewares/catchAsync');
const { ClientError } = require('../utils/clientError');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({path:'src/config/.env'});
const op = require('sequelize').Op;

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

    const user = await User.findOne({where:{email:email}});

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

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserInfo,
    updateUserProfile,
}