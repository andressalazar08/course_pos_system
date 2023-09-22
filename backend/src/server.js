const app = require('./app');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

dotenv.config({path:'src/config/.env'})


const PORT = process.env.PORT;

//Models imports here:
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Client = require('./models/Client');
const Sale = require('./models/Sale');
const Detail = require('./models/Detail');
const Transaction = require('./models/Transaction');
const { importFromJSON } = require('./utils/dataSeeder');

//Database authenticate
const authenticateAndSyncDatabase = async()=>{
    try{
        await sequelize.authenticate()
        console.log('Database connection established');

        //sync
        await sequelize.sync({force:false})
        console.log('Database synced successfully');

        //importFromJSON();

    }catch(error){
        console.error('Failed to connect or sync database', error)
    }
}


const server = app.listen(PORT, ()=>{
    console.log(`Server running on Port: ${PORT}`)
    authenticateAndSyncDatabase();
})