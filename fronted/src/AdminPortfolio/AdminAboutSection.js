import React, { useState, useEffect } from "react";
import { Form, message, Space, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchPortfolioData } from "./fetchPortfolioData";

const AdminAboutSection = ({ abouts, titleText }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [aboutsState, setAbouts] = useState(abouts); // local state for abouts list
  console.log("aboutsState::---", aboutsState);

  const refreshPortfolioData = async () => {
    try {
      // Call the function to re-fetch the portfolio data
      const updatedData = await fetchPortfolioData();
      // Here, we assume 'fetchPortfolioData' returns updated portfolio data
      setAbouts(updatedData?.abouts || []);
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
      if (!selectedItemForEdit) {
        response = await axios.post(
          "http://localhost:5000/api/portfolio/add-about",
          { ...values },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
      } else {
        response = await axios.put(
          "http://localhost:5000/api/portfolio/update-about",
          {
            ...values,
            _id: selectedItemForEdit._id,
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
      message.error("Network Error: " + error.message);
    } finally {
      setShowAddEditModal(false);
      setSelectedItemForEdit(null);
    }
  };

  const onDelete = async (aboutId) => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setAlertMessage("You are not authenticated. Redirecting to login...");
        setAlertType("error");
        navigate("/");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/portfolio/delete-about",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Pass token in the header
          },
          credentials: "include", // Include cookies in the request
          body: JSON.stringify({ aboutId }), // Pass the aboutId in the body
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "About card deleted successfully.");
        refreshPortfolioData(); // Refresh portfolio data after deletion
      } else {
        alert(result.message || "Failed to delete the About card.");
      }
    } catch (error) {
      console.error("Error deleting About card:", error);
      alert("An error occurred while deleting the About card.");
    }
  };

  return (
    <div className="h-screen w-full pt-4">
      <h1 className="text-xl bg-pink-900 text-white text-left py-4 pl-20">
        {titleText}____
      </h1>
      <div className="mx-32 mt-4">
        <button
          className="bg-red-400 px-4 py-1 hover:bg-red-600"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          New About Create
        </button>
      </div>
      <div className="text-black mt-24 grid grid-cols-3 gap-3 px-3">
        {aboutsState.map((about, idx) => (
          <div
            key={idx}
            className="bg-pink-900 font-semibold text-center rounded-3xl border shadow-lg p-10"
          >
            <h1>{about._id}</h1>
            <div className="py-2">
              <button
                className="text-white bg-black text-2xl mx-2 px-3"
                onClick={() => {
                  setSelectedItemForEdit(about);
                  setShowAddEditModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="text-orange-600 bg-black text-2xl mx-2 px-3"
                onClick={() => onDelete(about._id)} // Implement onDelete
              >
                Delete
              </button>
            </div>
            <img
              className="my-3 w-32 h-32 rounded-full shadow-lg mx-auto"
              src={about.aboutImageUrl}
              alt=""
            />
            <h1 className="text-lg text-white">{about.aboutTitle}</h1>
            <p className="text-sm text-gray-400">{about.aboutDescription}</p>
            <h1 className="text-left text-xl text-white py-2">
              {about.aboutTodo}
            </h1>
            <ul className="text-left text-black pl-4 list-disc">
              {about.aboutListTodos.map((item, index) => (
                <li key={index}>{item.todo}</li>
              ))}
            </ul>
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
          onFinish={onFinish}
          form={form}
          initialValues={selectedItemForEdit}
          layout="vertical"
        >
          {/* Form Fields Here */}
          <Form.Item name="aboutImageUrl">
            <input
              placeholder="imageUrl"
              className="p-2 py-2 border-red-900 w-full rounded-lg"
            />
          </Form.Item>

          <Form.Item name="aboutTitle" className="text-center">
            <input
              placeholder="About Title"
              className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </Form.Item>

          <Form.Item name="aboutDescription" className="text-center">
            <textarea
              placeholder="About Description"
              className="p-2 py-8 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </Form.Item>

          <Form.Item name="aboutTodo" className="text-center">
            <input
              placeholder="About Todo"
              className="p-2 py-2 border-red-900 text-xl w-full rounded-lg border hover:bg-blue-100 hover:border-blue-900"
            />
          </Form.Item>

          <Form.List name="aboutListTodos">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 2 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "todo"]}
                      fieldKey={[fieldKey, "todo"]}
                      rules={[{ required: true, message: "Missing todo" }]}
                    >
                      <input
                        placeholder="Todo"
                        className="p-2 border border-red-700"
                      />
                    </Form.Item>
                    <Button type="link" onClick={() => remove(name)} danger>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    className="bg-red-300"
                  >
                    Add List
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <div className="flex justify-center">
            <button
              className="bg-red-400 px-3 py-1 m-4 rounded-md hover:bg-red-600"
              onClick={() => setShowAddEditModal(false)}
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
};

export default AdminAboutSection;
