import axios from "axios";
import Cookies from "js-cookie";

export const fetchPortfolioData = async () => {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      throw new Error("You are not authenticated. Please log in.");
    }

    const response = await axios.get(
      "http://localhost:5000/api/portfolio/data",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );

    console.log("response portfolio: ", response.data);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};
