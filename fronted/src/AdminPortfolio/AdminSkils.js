import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { fetchPortfolioData } from "./fetchPortfolioData";
import AdminSkillsComponentPage from "./AdminSkillsComponentPage";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminSkills() {
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

  console.log("portfolioData  Skill page pe ::::: ", portfolioData);

  // console.log('portfolioData Skill page:', portfolioData.myskills);

  return (
    <div>
      <AdminHeader />

      <div>
        {portfolioData && portfolioData.myskills ? (
          <AdminSkillsComponentPage
            myskills={portfolioData.myskills}
            titleText="Admin Skills Section"
          />
        ) : (
          <p>No skills data available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminSkills;
