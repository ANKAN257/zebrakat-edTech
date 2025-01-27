const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app= express();
const cookieParser = require('cookie-parser');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your React client's domain and port
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If you need to include cookies in cross-origin requests
  
    next();
  });

require("dotenv").config()

const dbConfig=require('./config/dbConfig');
const portfolioRoute=require('./routes/portfolioRoutes');
const authRouter=require('./routes/authRouter');
// const userProfile=require('./routes/userProfile');

const {authenticateToken}=require('./Profile_data/JWT_function');





app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const port=process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser());




app.use('/api/auth',authRouter);//no auth required here
app.use('/api/portfolio', portfolioRoute)




  



app.listen(port,()=>{
    console.log("server is listening on port " + port);
});