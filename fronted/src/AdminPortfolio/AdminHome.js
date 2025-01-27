import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminHome() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      // Get the token from the cookies
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setError("You are not authenticated.");
        return;
      }

      // Make the API request with Authorization header
      const response = await axios.get(
        "http://localhost:5000/api/portfolio/userdata",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the header
          },
          withCredentials: true, // Include credentials (cookies)
        }
      );

      setUserData(response.data.data); // Assuming the user data is in the "data" field
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    }
  };

  // useEffect to handle component lifecycle
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      navigate("/"); // Redirect to login if not authenticated
      return;
    }

    fetchUserData(); // Fetch user data initially
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      // Check the user's role and handle redirection for unauthorized users
      if (userData.role !== "admin") {
        alert("You cannot access this page.");
        navigate("/"); // Redirect unauthorized users to the homepage
      }
    }
  }, [userData, navigate]);

  return (
    <div className="h-screen w-full">
      <AdminHeader />
      <div className="text-center mt-4">
        {error && <div className="text-red-600">{error}</div>}
        {userData ? (
          <div>
            <h1>Welcome, {userData.username} </h1>
            <p>Email: {userData.email}</p>
            <h1>Role: {userData.role}</h1>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <div className="text-center mt-4">
          <a className="bg-blue-600 px-3 py-3 rounded-sm text-white" href="/">
            Go to user page
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
