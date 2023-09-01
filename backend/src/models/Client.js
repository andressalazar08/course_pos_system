const sequelize = require('../config/database');
const { DataTypes }= require('sequelize');

const Client = sequelize.define('Client',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true
    }

});

module.exports = Client;