import React, { useState, useEffect } from "react";
import { fetchPortfolioData } from "../../AdminPortfolio/fetchPortfolioData";
import BlogContentPage from "./BlogContentPage";

function BlogMainContentPage() {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    fetchPortfolioData()
      .then((data) => {
        setPortfolioData(data); // Ensure fetchPortfolioData returns the fetched data
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
      });
  }, []);

  console.log("BlogMainContentPage ::::: ", portfolioData);

  return (
    <div>
      {portfolioData && portfolioData.myblogdatas ? (
        <BlogContentPage myblogdatas={portfolioData.myblogdatas} />
      ) : (
        <p>Loading...</p> // or any message for when data is not yet available
      )}
    </div>
  );
}

export default BlogMainContentPage;
