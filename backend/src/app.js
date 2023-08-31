const express = require('express');


const app = express();

//simple api test
app.get('/', (req,res)=>{
    res.json({
        message:"POS api"
    })
})


module.exports = app;