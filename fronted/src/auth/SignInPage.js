import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const SignUpPage = () => {
const navigate=useNavigate()


 
const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:"",
    // confirmPassword:""
})
const [isSubmitting, setIsSubmitting] = useState(false); // For handling multiple submissions

const handleInputChange=(e)=>{
    const {name,value}=e.target
     console.log(value);
     setFormData({
        ...formData,
        [name]: value,
      });

}

const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("Name:  "+formData.username);
    console.log("Email  "+formData.email);
    console.log("Password  "+formData.password);
    // console.log("confirmPassword  "+formData.confirmPassword);
    // setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
         console.log("Registration successful:", response.data);
         window.alert("Registration successful!");
         setIsSubmitting(true);
       
         setFormData({
          username: "",
            email: "",
            password: "",
            // confirmPassword: "",
          });

     // Redirect to the homepage
      navigate("/login");


    } catch (error) {
        console.error("Error during registration:", error);
        alert("Registration failed. Please try again.");
        // Registration failed. Please try again.
        
    }finally {
      setIsSubmitting(false);
    }
    
}
 

  



  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-md shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Signup</h2>
      <form 
      onSubmit={handleSubmit}
      >
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="name">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your name"
          />
        
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
         
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
         
        </div>

        {/* Confirm Password Field */}
        {/* <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Confirm your password"
          />
        
        </div> */}

    

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className={`w-full p-2 ${
              isSubmitting ? "bg-gray-400" : "bg-blue-600"
            } text-white rounded-md`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Signup"}
          </button>

        </div>

      </form>


      <div className="mb-4">
         
              <a
                href="/login"
                className="w-full p-2  text-white rounded-md bg-blue-600  hover:text-green-200 transition-colors duration-200"
              >
                Login
              </a>
        
          
        </div>
    </div>
  );
};





export default SignUpPage;
