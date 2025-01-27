import React, { useState, useEffect } from "react";
import { Form, message, Space, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchPortfolioData } from "./fetchPortfolioData";

function AdminSkillsComponentPage({ myskills, titleText }) {
  console.log("myskills;;;;;", myskills);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [skillsState, setSkills] = useState(myskills); // local state for abouts list
  // console.log("skillsState::---",skillsState);

  const refreshPortfolioData = async () => {
    try {
      // Call the function to re-fetch the portfolio data
      const updatedData = await fetchPortfolioData();
      // Here, we assume 'fetchPortfolioData' returns updated portfolio data
      setSkills(updatedData?.myskills || []);
    } catch (error) {
      message.error("Error refreshing portfolio data.");
    }
  };

  const onFinish = async (values) => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        setAlertMessage("You are not authenticated. Redirecting to login...");
        setAlertType("error");
        navigate("/"); // Redirect to login if not authenticated
        return;
      }
  
      let response;
      if (selectedItemForEdit) {
        // Update existing skill
        response = await axios.put(
          "http://localhost:5000/api/portfolio/update-skill",
          {
            ...values, // Spread form values
            _id: selectedItemForEdit._id, // Add _id to update the correct skill
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
      } else {
        // Add new skill
        response = await axios.post(
          "http://localhost:5000/api/portfolio/add-skill",
          {
            ...values, // Spread form values
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
      }
  
      // Check if the request was successful
      if (response.data.success) {
        message.success(response.data.message); // Show success message
        refreshPortfolioData(); // Refresh portfolio data after adding/updating
  
      } else {
        message.error(response.data.message); // Show error message if failure
      }
    } catch (error) {
    
      console.error("Error during form submission:", error);
      message.error("Network Error: " + error.message); // Show error message
    } finally {
      // Close modal and reset selected item
      setShowAddEditModal(false); // Assuming this state controls modal visibility
      setSelectedItemForEdit(null); // Reset selected item for editing
    }
  };

  const onDelete = async (skillId) => {
      
    try {

        console.log("Skill Id hai ",skillId);
        
      const accessToken = Cookies.get("accessToken");
  
      if (!accessToken) {
        setAlertMessage("You are not authenticated. Redirecting to login...");
        setAlertType("error");
        navigate("/");
        return;
      }
    
      const response = await axios.delete("http://localhost:5000/api/portfolio/delete-skill",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Pass token in the header
          },
          data: { skillId }, // Pass the projectId in the data object for DELETE requests
          withCredentials: true, // Include cookies in the request
        }
      );
      console.log("Response:", response);
      const result = await response.data;
      console.log("skill Result: ",result);
      
  
      if (response.status === 200) {
        message.success(result.message || "skill deleted successfully.");
        refreshPortfolioData(); // Refresh portfolio data after deletion
      } else {
        message.error(result.message || "Failed to delete the skill.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      message.error("An error occurred while deleting the project.");
    }
  };
  

  

  return (
    <div className="mx-32 mt-4">
      <h1 className="text-center text-3xl">{titleText}</h1>

      <div>
        <button
          className="bg-red-400 px-4 py-1 hover:bg-red-600"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add New Skill
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3 mt-10">
        {skillsState.map((skill, index) => (
          <div
            key={index}
            className="bg-pink-900 font-semibold text-center rounded-md border shadow-lg p-2"
          >
            <img
              src={skill.mySkillImage}
              alt=""
              className="h-12 w-16 rounded-md mx-auto"
            />
            <p className="text-center text-white font-bold my-2">
              {skill.mySkilltitle}
            </p>
            <div className="mt-1 text-center">
              <button
                className="px-2 py-1 mr-2 bg-blue-400 rounded-md hover:bg-blue-800"
                onClick={() => {
                  setSelectedItemForEdit(skill);
                  setShowAddEditModal(true);
                }}
              >
                edit
              </button>
              <button
                className="px-2 py-1 mr-2 bg-red-400 rounded-md hover:bg-red-300"
                onClick={() => onDelete(skill._id)}
              >
                delete
                {/* <h1>{skill._id}</h1> */}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit About" : "Add About"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
      >
        <Form
          form={form}
          initialValues={selectedItemForEdit}
          onFinish={onFinish}
          className="justify-between items-center flex-col py-12"
          layout="vertical"
        >
          <Form.Item name="mySkilltitle" className="text-center">
            <input
              placeholder="mySkilltitle"
              className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </Form.Item>
          <Form.Item name="mySkillImage" className="text-center">
            <input
              placeholder="mySkillImage"
              className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </Form.Item>

          <div className="flex justify-center">
            <button
              className="bg-red-400 px-3 py-1 m-4 rounded-md hover:bg-red-600"
              onClick={() => {
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                form.resetFields(); // Reset form fields on cancel
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 px-3 py-1 m-4 rounded-md hover:bg-blue-600"
              type="submit"
            >
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminSkillsComponentPage;
