const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const crypto = require('crypto');

const User = sequelize.define('User', {
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    profile:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:'user',
    },
    imageUrl:{
        type:DataTypes.STRING,
    },
    resetPasswordToken:{
        type:DataTypes.STRING,
    },
    resetPasswordExpire:{
        type:DataTypes.DATE,
    }
});

User.prototype.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 30*60*1000;

    return resetToken;
};


module.exports = User;