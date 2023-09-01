const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Category = require('./Category');

const Product = sequelize.define('Product',{
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

//Associations
Category.hasMany(Product)
Product.belongsTo(Category);
//ON DELETE defaults to SET NULL and ON UPDATE defaults to CASCADE
module.exports = Product;