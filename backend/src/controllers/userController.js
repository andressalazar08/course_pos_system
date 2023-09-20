const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async(req, res)=>{

    const { name, email, password, profile, imageUrl }= req.body;

    try{
        const existingUser = await User.findOne({where:{email:email}});
        if(existingUser){
            return res.status(400).json({message:'User already exists, cannot create a user with this email'});
        }

        //encrypt password before create
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }catch(hashError){
            return {message:'Internal error on password hashing'};
        }


        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            profile,
            imageUrl,
        });
        return res.status(201).json({message:'User registered successfully', user:newUser});

    }catch(error){
        console.log('Error on register user', error);
        return res.status(500).json({message:'Internal server Error', error:error.message});
    }
};

module.exports = {
    registerUser,
}