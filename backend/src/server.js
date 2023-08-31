const app = require('./app');
const dotenv = require('dotenv');


dotenv.config({path:'src/config/.env'})


const PORT = process.env.PORT


const server = app.listen(4000, ()=>{
    console.log(`server running on port:  ${PORT}`)
})