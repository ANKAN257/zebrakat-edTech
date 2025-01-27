import React, { useState, useEffect } from "react";
import { Form, message, Space, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchPortfolioData } from "./fetchPortfolioData";

function AdminExperienceComponent({ myexperiences, titleText }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [selectItemIdx, setSelectedItemIdx] = useState(0);
  const [editAndDeleteShow, setEditAndDeleteShow] = useState(false);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [myexperienceState, setMyexperiences] = useState(myexperiences); // local state for abouts list
  console.log("myexperienceState::---", myexperienceState);

  const refreshPortfolioData = async () => {
    try {
      // Call the function to re-fetch the portfolio data
      const updatedData = await fetchPortfolioData();
      // Here, we assume 'fetchPortfolioData' returns updated portfolio data
      setMyexperiences(updatedData?.myexperiences || []);
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
        navigate("/");
        return;
      }

      let response;
      if (selectedItemForEdit) {
        response = await axios.put(
          "http://localhost:5000/api/portfolio/update-experience",
          {
            ...values,
            _id: selectedItemForEdit._id,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/portfolio/add-experience",
          {
            ...values, // Spread the values object to send all form fields
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
      }

      console.log("Experience Response:", response);

      if (response.data.success) {
        message.success(response.data.message);
        refreshPortfolioData(); // Refresh portfolio data after adding/updating
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      // Handle network errors
      message.error("Network Error: " + error.message);
    } finally {
      // Regardless of success or failure, close the modal and reset selected item
      setShowAddEditModal(false);
      setSelectedItemForEdit(null);
    }
  };

  const onDelete = async (expId) => {
    try {
      console.log("Expe hai kuch ", expId);

      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setAlertMessage("You are not authenticated. Redirecting to login...");
        setAlertType("error");
        navigate("/");
        return;
      }

      const response = await axios.delete(
        "http://localhost:5000/api/portfolio/delete-experience",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Pass token in the header
          },
          data: { expId }, // Pass the projectId in the data object for DELETE requests
          withCredentials: true, // Include cookies in the request
        }
      );
      console.log("Response:", response.data);
      const result = await response.data;
      console.log("experience Result: ", result);

      if (response.status === 200) {
        message.success(result.message || "experience deleted successfully.");
        refreshPortfolioData(); // Refresh portfolio data after deletion
      } else {
        message.error(result.message || "Failed to delete the experience.");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      message.error("An error occurred while deleting the experience.");
    }
  };

  return (
    <div className="mx-32 mt-4">
      <h1 className="text-center text-3xl my-4"> {titleText} </h1>

      <div>
        <button
          className="bg-red-400 px-4 py-1 hover:bg-red-600"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add New Experiences
        </button>
      </div>

      <div className=" py-4 flex  ">
        <div className="bg-white  w-2/5 flex-col p-3     ">
          {myexperienceState.map((exp, currIdx) => (
            <div
              className="cursor-pointer  border-l-4  border-red-600"
              onClick={() => {
                setSelectedItemIdx(currIdx);
                setEditAndDeleteShow(true);
              }}
            >
              <h1
                className={`text-xl text-black p-2  
                             ${
                               selectItemIdx === currIdx
                                 ? "text-white border-2 bg-pink-900 border-red-900 border-l-4 -ml-1   shadow-slate-700 shadow-md"
                                 : "text-black"
                             }`}
              >
                {exp.myExperiencePeriod}
                {editAndDeleteShow && selectItemIdx === currIdx && (
                  <div className="  ">
                    <button
                      className="px-2  m-1 bg-blue-500 rounded-md hover:bg-blue-900"
                      onClick={() => {
                        setSelectedItemForEdit(exp);
                        setShowAddEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2  bg-red-600 rounded-md hover:bg-red-900"
                      onClick={() => onDelete(exp._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </h1>
            </div>
          ))}
        </div>

        {myexperienceState[selectItemIdx] && (
          <div className="w-3/5 bg-white flex flex-col pl-8 pt-2  border-l-red-400 ">
            <h1 className="font-semibold text-xl">
              Designation :-{" "}
              {myexperienceState[selectItemIdx].myExperienceTitle}__
            </h1>
            <h1 className=" text-xl font-semibold">
              Company Name :-{" "}
              {myexperienceState[selectItemIdx].myExperienceCompany}
            </h1>
            <h1 className="text-xl font-semibold">Description :- </h1>

            <p className="text-black-600 font-serif px-2">
              {myexperienceState[selectItemIdx].myExperienceDescription}
            </p>
          </div>
        )}
      </div>

      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Project" : "Add Project"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
      >
        <Form
          initialValues={selectedItemForEdit}
          onFinish={onFinish}
          className="justify-between items-center flex-col py-12"
          layout="vertical"
          form={form}
        >
          <Form.Item name="myExperienceTitle" className="text-center  ">
            <input
              placeholder="myExperienceTitle"
              className="p-2 py-2 border-red-900 text-xl  w-full  rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </Form.Item>

          <Form.Item name="myExperiencePeriod" className="text-center  ">
            <input
              placeholder="myExperiencePeriod"
              className="p-2 py-2 border-red-900 text-xl  w-full  rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </Form.Item>
          <Form.Item name="myExperienceCompany" className="text-center  ">
            <input
              placeholder="myExperienceCompany"
              className="p-2 py-2 border-red-900 text-xl  w-full  rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </Form.Item>

          <Form.Item name="myExperienceDescription" className="text-center  ">
            <textarea
              placeholder="myExperienceDescription"
              className="p-2 py-2 border-red-900 text-xl  w-full  rounded-lg border hover:bg-blue-100 hover:border-blue-900"
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

export default AdminExperienceComponent;
