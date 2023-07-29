const express=require('express');
const cors=require('cors');
const bodyParser = require('body-parser');


//middlewares
const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongoDB conection and routes
const mongose=require('./db_con/mongo_db');
const mongo=require('./routes/mongo');
app.use('/',mongo);

//mysql connection and routes
const conn=require('./db_con/mysql_db');
const mysql=require('./routes/mysql');
app.use('/',mysql);


const port=3000;
app.listen(port,()=>{
    console.log("listening in port 3000");
});