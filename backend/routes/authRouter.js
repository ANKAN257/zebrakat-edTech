const express = require('express');
const router = express.Router();
require('dotenv').config();

const isAdminEmail=require('../Profile_data/isAdminEmail');
const getHashedPassword=require('../Profile_data/hashPasswordFunction');
const bcrypt = require('bcrypt');
const {generateAccessToken}=require('../Profile_data/JWT_function');


const User=require('../models/userModel');





// Register route
router.post('/register', async (req, res, next) => {
    try {
        const {  password, email ,username } = req.body;
        // console.log(req.body);

        // Check if all fields are provided
        if ( !password || !email  || !username ) {
            return res.status(400).json({ error: ' password, email and UserName are required' });

        }

      // Check if the email is from the admin domain
      
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
          return res.status(400).json({ error: "Email already exists." });
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, error: 'Username already exists.' });
        }
        
        
        // Hash the password
        const hashedPassword = await getHashedPassword(password);
        
        const role = isAdminEmail(email) ? 'admin' : 'user';


        const user = new User({
            password: hashedPassword,
            email,
            username,
            role, // Assign role based on email domain
        });
        console.log(user);

        // Save the user to the database
        await user.save();

        // Respond with success message
    res.status(201).json({ success: true, message: "User created successfully.",user: { username: user.username, email: user.email, role: user.role }, });

        

    } catch (error) {
        next(error);
    }
});


router.post('/login', async (req, res, next) => {
    try {
        const { password, email } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Username and password are required." });
      }

    const user = await User.findOne({ email });
       if (!user) {
              return res.status(400).json({ error: "Invalid credentials." }); // Generic error message
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
             return res.status(400).json({ error: "Invalid credentials." }); // Generic error message
        }

        await user.save(); 

     const  accessToken = generateAccessToken({ username: user.username, email: user.email,role: user.role });
       console.log("accessToken",accessToken);

       res.cookie("accessToken", accessToken,{httpOnly: true,secure:false }); 
   


   return res.status(200).json({
    message: "Login successful",
    user: {
        username: user.username,
        email: user.email,
        role: user.role,
    },
    accessToken,
    

  });
      
      
    } catch (error) {
        return next(error);
    }
});




router.get('/logout',async(req,res,next)=>{
    try {
        console.log("accessToken");
        res.clearCookie('accessToken')
        req.user=undefined
        res.send("logged out successfully")

    } catch (error) {
        return next(error)
    }
})


module.exports =  router;
