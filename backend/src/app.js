const express = require('express');



const app = express();

app.get('/', (req, res)=>{
    res.json({
        message:"POS system api"
    })
})

// app.use(express.json());


//Import all routes
const userRoute = require('./routes/userRoute');
app.use('/api/v1', userRoute);

module.exports = app;   