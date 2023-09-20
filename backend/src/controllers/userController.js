const User = require('../models/User');


const registerUser = async(req, res)=>{

    const { name, email, password, profile, imageUrl }= req.body;

    try{
        const existingUser = await User.findOne({where:{email:email}});
        if(existingUser){
            return res.status(400).json({message:'User already exists, cannot create a user with this email'});
        }

        const newUser = await User.create({
            name,
            email,
            password,
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