const sequelize = require('../config/database');
const { DataTypes }= require('sequelize');

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
});

module.exports = User;