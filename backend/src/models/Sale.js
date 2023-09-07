const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Client = require('./Client');


const Sale = sequelize.define('Sale',{
    date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    amount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
});

//Associations
Sale.belongsTo(User);
Sale.belongsTo(Client);

module.exports = Sale;