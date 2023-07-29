const mysql=require('mysql');

const conn=mysql.createConnection({
  host:"db4free.net",
  user:"products_01",
  password:"praveen01",
  database:"products_123"
})
/*
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_crud"
  })
  */
conn.connect((err)=>{
  if(err)throw err;
  else console.log("connected to mysql");
})

module.exports=conn;