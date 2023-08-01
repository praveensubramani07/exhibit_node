const express=require('express');
const cors=require('cors');
const bodyParser = require('body-parser');


//middlewares
const app=express();

app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongoDB conection and routes
const mongoose=require('mongoose');
const mongose=require('./db_con/mongo_db');
const mongo=require('./routes/mongo');
app.use('/api',mongo);




const port=3000;
app.listen(port,()=>{
    console.log("listening in port 3000");
});
