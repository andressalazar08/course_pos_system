const express = require('express');



const app = express();

app.get('/', (req, res)=>{
    res.json({
        message:"POS system api"
    })
})

module.exports = app;   