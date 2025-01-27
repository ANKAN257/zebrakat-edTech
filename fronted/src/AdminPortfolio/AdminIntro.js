import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminIntro() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [formData, setFormData] = useState({
    welcomeText: "",
    firstName: "",
    lastName: "",
    description: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch authentication and handle submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        setAlertMessage("You are not authenticated. Redirecting to login...");
        setAlertType("error");
        navigate("/");
        return;
      }

      const response = await axios.put(
        "http://localhost:5000/api/portfolio/update-intro",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Submitted data:", formData);
        setAlertMessage("Form submitted successfully!");
        setAlertType("success");
        setIsAuthenticated(true);

        // Clear the form
        setFormData({
          welcomeText: "",
          firstName: "",
          lastName: "",
          description: "",
        });

        // Reset the alert after 3 seconds
        setTimeout(() => {
          setAlertMessage("");
          setAlertType("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertMessage("Failed to submit form. Please try again.");
      setAlertType("error");
      setIsAuthenticated(false);

      // Reset the alert after 3 seconds
      setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 3000);
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="">
      <AdminHeader />
      <div className="mx-32 mt-4">
        <h1 className="text-center text-3xl">Admin Intro</h1>

        {alertMessage && (
          <div
            className={`text-center my-4 ${
              alertType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {alertMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between items-center py-12"
        >
          <div className="text-center w-full mb-4">
            <input
              type="text"
              name="welcomeText"
              value={formData.welcomeText}
              onChange={handleChange}
              placeholder="Intro"
              className="p-2 py-5 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </div>
          <div className="text-center w-full mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="p-2 py-5 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </div>
          <div className="text-center w-full mb-4">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-2 py-5 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </div>
          <div className="text-center w-full mb-6">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-2 cols-4 block border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-400 px-12 py-3 rounded-md hover:bg-red-600"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminIntro;
