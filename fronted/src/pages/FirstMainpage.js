import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Annoucemnet from "./Annoucemnet";

function Button({ label, bgColor, hoverBgColor, onClick }) {
  return (
    <button
      className={`text-lg text-white ${bgColor} hover:${hoverBgColor} px-6 py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function FirstMainpage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    setLoading(true); // Start loading
    try {
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
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to fetch user data.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  // useEffect to handle component lifecycle
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      fetchUserData();
    }
  }, [navigate]);

  return (
    <div className="bg-custom-blue min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4  shadow-md shadow-blue-300">
        <div className="flex  text-3xl items-center space-x-4">
          <a
            href="/"
            className="text-3xl text-white font-bold hover:text-gray-300"
          >
            <h1>zebraKat</h1>
          </a>
        </div>

        <div className="flex space-x-6">
          {/* Accessible for both authenticated and unauthenticated users */}
          <Button
            label="Portfolio"
            bgColor="bg-custom-blue"
            hoverBgColor="bg-blue-900"
            onClick={() => navigate("/portfolio")}
          />
          <Button
            label="Solve DSA Problems"
            bgColor="bg-custom-blue"
            hoverBgColor="bg-blue-900"
            onClick={() => navigate("/dsa-problems")}
          />
          <Button
            label="Coding BlogPage"
            bgColor="bg-custom-blue"
            hoverBgColor="bg-blue-900"
            onClick={() => navigate("/blog")}
          />
        </div>

        <div className="flex space-x-6">
          {userData ? (
            <>
              {userData.role === "admin" && (
                <Button
                  label="Admin Panel"
                  bgColor="bg-yellow-600"
                  hoverBgColor="bg-yellow-700"
                  onClick={() => navigate("/admin")}
                />
              )}
              <Button
                label="Logout"
                bgColor="bg-red-600"
                hoverBgColor="bg-red-700"
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <a
                href="/register"
                className="text-lg text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Register
              </a>
              <a
                href="/login"
                className="text-lg text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10 p-4 text-center text-white">
        <h2 className="text-2xl font-semibold">Welcome to ZebraKat!</h2>
        <p className="text-lg mt-4">
          Explore our portfolio, solve DSA problems, and read our coding blog.
        </p>

        {loading ? (
          <p className="text-white mt-4"> </p>
        ) : error ? (
          <p className="text-red-600 mt-4">{error}</p>
        ) : userData ? (
          <div className="mt-6">
            <p className="text-lg">Welcome back, {userData.username}!</p>
            <p className="text-lg">Role: {userData.role}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FirstMainpage;
