const User = require('../models/User');
const bcrypt = require('bcrypt');
const { catchAsyncErrors } = require('../middlewares/catchAsync');
const { ClientError } = require('../utils/clientError');

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

module.exports = {
    registerUser,
}