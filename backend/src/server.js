const app = require('./app');



const server = app.listen(4000, ()=>{
    console.log(`server running on port`)
})