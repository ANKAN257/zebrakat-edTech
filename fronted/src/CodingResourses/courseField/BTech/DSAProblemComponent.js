

import Navbar from '../../Navbar/Navbar';
import DSAHome from './DSA/DSAHome';
import React, { useState, useEffect } from "react";


import {fetchPortfolioData} from '../../../AdminPortfolio/fetchPortfolioData'
import axios from "axios";

function DSAProblemComponent() {
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

  console.log("portfolioData  ProjectAdmin page pe ::::: ", portfolioData);






  return (
    <div>
          <Navbar></Navbar>
      
          <div>
       
       {portfolioData && portfolioData.mydsaproblems ? (
         <DSAHome mydsaproblems={portfolioData.mydsaproblems} />
         
       ) : (
         <p>Loading...</p> // or any message for when data is not yet available
       )}
     </div>


          
    </div>
  )
}

export default DSAProblemComponent