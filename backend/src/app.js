const express = require('express');
const { errorHandler } = require('./middlewares/errors');

const app = express();
app.use(express.json());

//simple api test
app.get('/', (req,res)=>{
    res.json({
        message:"POS api"
    })
})

const userRoute = require('./routes/userRoute');
app.use('/api/v1', userRoute);

app.use(errorHandler);

module.exports = app;