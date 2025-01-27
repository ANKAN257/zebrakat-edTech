import React, { useState, useEffect } from "react";
import { fetchPortfolioData } from "../AdminPortfolio/fetchPortfolioData";
import BlogPageComponent from "./BlogPageComponent";
import axios from "axios";
import Cookies from "js-cookie";

function BlogHomeComponent() {
  const [portfolioData, setPortfolioData] = useState(null);



  useEffect(() => {
    const getPortfolioData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/portfolio/data");
    
        console.log("response portfolio: ", response.data);
        
        setPortfolioData(response.data); // Set the data in state
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        
      }
    };

    getPortfolioData(); 
  }, []);

  return (
    <div>
      {portfolioData && portfolioData.myblogdatas ? (
        <BlogPageComponent myblogdatas={portfolioData.myblogdatas} />
      ) : (
        <p>Loading...</p> // Message when data is loading
      )}
    </div>
  );
}

export default BlogHomeComponent;
