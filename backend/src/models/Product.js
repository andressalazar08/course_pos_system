const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Category = require('./Category');

const Product = sequelize.define('Product',{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.TEXT,
    },
    imageUrl:{
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

//Associations
Category.hasMany(Product);
Product.belongsTo(Category);


module.exports = Product;
