import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Cookies from "js-cookie";

const LogInPage = () => {
  const [formData, setFormData] = useState({
    // username:"",
    email: "",
    password: "",
    // confirmPassword:""
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // For handling multiple submissions
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Name:  "+formData.username);
    console.log("Email  " + formData.email);
    console.log("Password  " + formData.password);
    // console.log("confirmPassword  "+formData.confirmPassword);
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          // username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Assuming the token is in the response data
      console.log("response :::::________  ", response);

      const accessToken = response.data.accessToken;
      Cookies.set("accessToken", accessToken);

      console.log(
        "response.data.accessToken::::: -----",
        response.data.accessToken
      );

      console.log("Login successful:", response.data);
      window.alert("Login successful!");

      setFormData({
        // username: "",
        email: "",
        password: "",
        // confirmPassword: "",
      });

      // Redirect to the homepage
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Login failed. Please try again.");
      // Registration failed. Please try again.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-md shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        {/* <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="name">
            Name
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
        
        </div> */}

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

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className={`w-full p-2 ${
              isSubmitting ? "bg-gray-400" : "bg-blue-600"
            } text-white rounded-md`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </div>
      </form>

      <div className="mb-4">
        <a
          href="/register"
          className="w-full p-2  text-white rounded-md bg-blue-600  hover:text-green-200 transition-colors duration-200"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default LogInPage;
