const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Sale = require('./Sale');
const Product = require('./Product');


const Detail = sequelize.define('Detail',{
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    subtotal:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
});

//Associations
Detail.belongsTo(Product);
Detail.belongsTo(Sale);

module.exports = Detail;