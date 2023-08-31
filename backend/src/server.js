const app = require('./app');
const dotenv = require('dotenv');


dotenv.config({path:'src/config/.env'})


const PORT = process.env.PORT;


const server = app.listen(PORT, ()=>{
    console.log(`Server running on Port: ${PORT}`)
})