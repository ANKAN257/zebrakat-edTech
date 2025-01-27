import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminBlogComponentpage from "./AdminBlogComponentpage";
import { fetchPortfolioData } from "./fetchPortfolioData";

function AdminBlog() {
  const [portfolioData, setPortfolioData] = useState(null);

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

  useEffect(() => {
    fetchPortfolioData()
      .then((data) => {
        setPortfolioData(data); // Ensure fetchPortfolioData returns the fetched data
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
      });
  }, []);

  console.log("portfolioData  ProjectAdmin page pe ::::: ", portfolioData);

  return (
    <div>
      <AdminHeader></AdminHeader>
      <div>
        {portfolioData && portfolioData.myblogdatas ? (
          <AdminBlogComponentpage
            myblogdatas={portfolioData.myblogdatas}
            titleText=" Admin Blog section"
          />
        ) : (
          <p>Loading...</p> // or any message for when data is not yet available
        )}
      </div>
    </div>
  );
}

export default AdminBlog;
