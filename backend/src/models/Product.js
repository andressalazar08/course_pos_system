const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product',{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.TEXT,
    },
    image:{
        type:DataTypes.STRING,
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
});

module.exports = Product;
