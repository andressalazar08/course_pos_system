const app = require('./app');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

dotenv.config({path:'src/config/.env'})


const PORT = process.env.PORT

//Model imports here
const User = require('./models/User');//CHECK HERE:preview first
const Product = require('./models/Product');
const Category = require('./models/Category');
const Client = require('./models/Client');
const Sale = require('./models/Sale');
const Detail = require('./models/Detail');
const Transaction = require('./models/Transaction');

const authenticateAndSyncDatabase = async()=>{
    try{
        await sequelize.authenticate()
        console.log('Database connection established');

        await sequelize.sync({force:true}) //CHECK HERE//
        console.log('Database synced successfully');

    }catch(error){
        console.error('Failed to connect or sync database', error)
       /*
       es una práctica común utilizar console.log() para registros generales y console.error() 
       para manejar errores y excepciones.
       */
    }
}


const server = app.listen(4000, ()=>{
    console.log(`server running on port:  ${PORT}`)
    authenticateAndSyncDatabase();
})