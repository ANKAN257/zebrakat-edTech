import React, { useState, useEffect } from "react";
import { Form, message, Space, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchPortfolioData } from "./fetchPortfolioData";

function AdminDSAComponent({ mydsaproblems, titleText }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [selectItemIdx, setSelectedItemIdx] = useState(0);
  const [editAndDeleteShow, setEditAndDeleteShow] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [mydsaproblemsState, setMydsaproblems] = useState(mydsaproblems); // local state for abouts list
  console.log("mydsaproblemsState::---", mydsaproblemsState);

  const refreshPortfolioData = async () => {
    try {
      // Call the function to re-fetch the portfolio data
      const updatedData = await fetchPortfolioData();
      // Here, we assume 'fetchPortfolioData' returns updated portfolio data
      setMydsaproblems(updatedData?.mydsaproblems || []);
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
          "http://localhost:5000/api/portfolio/update-dsaproblem",
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
          "http://localhost:5000/api/portfolio/add-dsaproblem",
          {
            ...values, // Spread the values object to send all form fields
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
      }
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

  const onDelete = async (problemId) => {
    try {
      console.log("Expe hai kuch ", problemId);

      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setAlertMessage("You are not authenticated. Redirecting to login...");
        setAlertType("error");
        navigate("/");
        return;
      }

      const response = await axios.delete(
        "http://localhost:5000/api/portfolio/delete-dsaproblem",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Pass token in the header
          },
          data: { problemId }, // Pass the projectId in the data object for DELETE requests
          withCredentials: true, // Include cookies in the request
        }
      );
      console.log("Response:", response.data);
      const result = await response.data;
      console.log("project Result: ", result);

      if (response.status === 200) {
        message.success(result.message || "Project deleted successfully.");
        refreshPortfolioData(); // Refresh portfolio data after deletion
      } else {
        message.error(result.message || "Failed to delete the project.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      message.error("An error occurred while deleting the project.");
    }
  };

  useEffect(() => {
    if (selectItemIdx < 0 || selectItemIdx >= mydsaproblemsState.length) {
      setSelectedItemIdx(0);
    }
  }, [selectItemIdx, mydsaproblemsState.length]);

  const filteredProblems = mydsaproblemsState.filter((problem) => {
    if (!selectedTopic || problem.topicTitle === selectedTopic) {
      if (!selectedProblem || problem.problemName === selectedProblem) {
        return true;
      }
    }
    return false;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="text-left mx-4 my-2">
        <button
          className="bg-red-400 px-4 py-1 hover:bg-red-600"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Create New Project
        </button>
      </div>
      <div className="pt-8 px-4 flex gap-6">
        <div className="bg-white w-1/4 min-h-screen p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Topics</h2>
          {Array.from(
            new Set(mydsaproblemsState.map((item) => item.topicTitle))
          ).map((topic) => (
            <div
              key={topic}
              role="button"
              aria-selected={selectedTopic === topic}
              className={`cursor-pointer text-lg p-3 rounded-md mb-2 transition-all hover:bg-pink-700 hover:text-white 
                ${
                  selectedTopic === topic
                    ? "bg-pink-900 text-white shadow-md"
                    : "bg-gray-100"
                }`}
              onClick={() => {
                setSelectedTopic(topic);
                setSelectedProblem(null);
              }}
            >
              {topic}
            </div>
          ))}
        </div>

        {/* Problem List */}
        <div className="flex-grow bg-white p-6 rounded-lg shadow-lg">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Search by problem title..."
              value={selectedProblem}
              onChange={(e) => setSelectedProblem(e.target.value)}
            />
          </div>

          {/* Problem Table */}
          <div className="space-y-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Problem Name
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    First Question Link
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Article
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    YouTube Link
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Leetcode Link
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      setSelectedItemIdx(index);
                      setEditAndDeleteShow(true);
                    }}
                    className="hover:bg-gray-100 transition-transform duration-300"
                  >
                    <td className="px-4 py-2">{problem.problemName}</td>
                    <td className="px-4 py-2">{problem.questionLinkFirst}</td>
                    <td className="px-4 py-2">{problem.articleLink}</td>
                    <td className="px-4 py-2">{problem.youtubeLink}</td>
                    <td className="px-4 py-2">{problem.questionLinkSecond}</td>
                    <td className="px-4 py-2">
                      {"Click Here To Update or Delete"}
                      {editAndDeleteShow && selectItemIdx === index && (
                        <div className="  ">
                          <button
                            className="px-2  m-1 bg-blue-500 rounded-md hover:bg-blue-900"
                            onClick={() => {
                              setSelectedItemForEdit(problem);
                              setShowAddEditModal(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="px-2  bg-red-600 rounded-md hover:bg-red-900"
                            onClick={() => onDelete(problem._id)}
                          >
                            <h1>{problem._id}</h1>
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Adding/Editing Problem */}
          <Modal
            open={showAddEditModal}
            title={selectedItemForEdit ? "Edit Problem" : "Add Problem"}
            footer={null}
            onCancel={() => setShowAddEditModal(false)}
          >
            <Form
              initialValues={selectedItemForEdit}
              className="justify-between items-center flex-col py-12"
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              {/* Form Inputs */}
              <Form.Item
                name="topicTitle"
                rules={[
                  { required: true, message: "Please enter a topic title" },
                ]}
              >
                <input
                  placeholder="topicTitle"
                  className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
                />
              </Form.Item>
              <Form.Item
                name="problemName"
                rules={[
                  { required: true, message: "Please enter a problem Name" },
                ]}
              >
                <input
                  placeholder="problemName"
                  className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
                />
              </Form.Item>
              <Form.Item
                name="questionLinkFirst"
                rules={[
                  { required: true, message: "Please enter a code Link" },
                ]}
              >
                <input
                  placeholder="questionLinkFirst"
                  className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
                />
              </Form.Item>
              <Form.Item
                name="articleLink"
                rules={[
                  { required: true, message: "Please enter an article Link" },
                ]}
              >
                <input
                  placeholder="articleLink"
                  className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
                />
              </Form.Item>
              <Form.Item
                name="youtubeLink"
                rules={[
                  { required: true, message: "Please enter a YouTube Link" },
                ]}
              >
                <input
                  placeholder="youtubeLink"
                  className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
                />
              </Form.Item>
              <Form.Item
                name="questionLinkSecond"
                rules={[
                  { required: true, message: "Please enter a Leetcode Link" },
                ]}
              >
                <input
                  placeholder="questionLinkSecond"
                  className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
                />
              </Form.Item>

              {/* Form Buttons */}
              <div className="flex justify-center">
                <button
                  className="bg-red-400 px-3 py-1 m-4 rounded-md hover:bg-red-600"
                  onClick={() => {
                    setShowAddEditModal(false);
                    setSelectedItemForEdit(null);
                    form.resetFields();
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
      </div>
    </div>
  );
}

export default AdminDSAComponent;
