const fs = require('fs');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const importFromJSON = async()=>{
    try{
        const jsonFilePath = 'src/utils/data.json';
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        const users = JSON.parse(jsonData);

        for(const user of users){
            
            const hashedPassword = await bcrypt.hash(user.password, 10);

            await User.create({
                name:user.name,
                email:user.email,
                password:hashedPassword,
                profile:user.profile,
                imageUrl:user.imageUrl,
                isActive:user.isActive,
            })
        }


    }catch(error){
        console.log(error);
    }
};

module.exports = { importFromJSON };
