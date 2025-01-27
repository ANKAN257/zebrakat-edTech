import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { Form, message, Space, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminAboutSection from "./AdminAboutSection";

import axios from "axios";
import { fetchPortfolioData } from "./fetchPortfolioData";

function AdminAbout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"

  const [portfolioData, setPortfolioData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolioData()
      .then((data) => {
        setPortfolioData(data); // Ensure fetchPortfolioData returns the fetched data
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
      });
  }, []);

  console.log("portfolioData wala data ", portfolioData);

  return (
    <div>
      <AdminHeader></AdminHeader>

      <div>
        {portfolioData && portfolioData.abouts ? (
          <AdminAboutSection
            abouts={portfolioData.abouts}
            titleText="About Admin section"
          />
        ) : (
          <p>Loading...</p> // or any message for when data is not yet available
        )}
      </div>
    </div>
  );
}

export default AdminAbout;
