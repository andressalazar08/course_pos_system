const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Client = require('./Client');

const Transaction = sequelize.define('Transaction',{
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    transactionType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    }
});


//Associations
Transaction.belongsTo(User);
Transaction.belongsTo(Client);

module.exports = Transaction;   