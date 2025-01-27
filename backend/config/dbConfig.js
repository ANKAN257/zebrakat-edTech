const mongoose=require('mongoose');


mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on('error',()=>{
console.log("error connecting to Database");
})
connection.on('connected',()=>{
    console.log("dataBase connection established");
})

module.exports=connection;