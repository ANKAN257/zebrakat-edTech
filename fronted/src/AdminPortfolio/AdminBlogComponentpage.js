import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Form, Input, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchPortfolioData } from "./fetchPortfolioData";

const { TextArea } = Input;

function AdminBlogComponentPage({ myblogdatas, titleText }) {
  const [selectedBlogCategory, setSelectedBlogCategory] = useState(null);
  const [selectedBlogTitleName, setSelectedBlogTitleName] = useState(null);
  const [blogContent, setContent] = useState("");
  const [editAndDeleteShow, setEditAndDeleteShow] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectItemIdx, setSelectedItemIdx] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [myblogdatasState, setMyblogdatas] = useState(myblogdatas); // local state for abouts list
  console.log("myblogdatasState::---", myblogdatasState);

  const navigate = useNavigate();

  const refreshPortfolioData = async () => {
    try {
      // Call the function to re-fetch the portfolio data
      const updatedData = await fetchPortfolioData();
      // Here, we assume 'fetchPortfolioData' returns updated portfolio data
      setMyblogdatas(updatedData?.myblogdatas || []);
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
          "http://localhost:5000/api/portfolio/update-blog",
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
          "http://localhost:5000/api/portfolio/add-blog",
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

  const onDelete = async (blogId) => {
    try {
      console.log("Expe hai kuch ", blogId);

      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setAlertMessage("You are not authenticated. Redirecting to login...");
        setAlertType("error");
        navigate("/");
        return;
      }

      const response = await axios.delete(
        "http://localhost:5000/api/portfolio/delete-blog",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Pass token in the header
          },
          data: { blogId }, // Pass the projectId in the data object for DELETE requests
          withCredentials: true, // Include cookies in the request
        }
      );
      console.log("Response:", response.data);
      const result = await response.data;
      console.log("project Result: ", result);

      if (response.status === 200) {
        message.success(result.message || "blog deleted successfully.");
        refreshPortfolioData(); // Refresh portfolio data after deletion
      } else {
        message.error(result.message || "Failed to delete the blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("An error occurred while deleting the blog.");
    }
  };

  useEffect(() => {
    if (selectItemIdx < 0 || selectItemIdx >= myblogdatasState.length) {
      setSelectedItemIdx(0);
    }
  }, [selectItemIdx, myblogdatasState.length]);

  // Filter blogs based on search and category
  const filteredBlogsDatas = myblogdatasState.filter((blog) => {
    const matchesCategory =
      !selectedBlogCategory || blog.blogCategory === selectedBlogCategory;
    const matchesSearchQuery =
      !searchQuery ||
      blog.blogTitleName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  const handleCancel = () => {
    setShowAddEditModal(false);
    setSelectedItemForEdit(null);
    form.resetFields();
  };

  const handleShowAllBlogs = () => {
    setSelectedBlogCategory(null);
    setSearchQuery("");
  };
  const handleSearch = () => {
    // You can add any custom behavior for search action here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="mx-4 mt-4">
      <h1 className="text-center text-3xl">{titleText}</h1>
      <button
        className="bg-red-400 px-4 py-1 hover:bg-red-600"
        onClick={() => {
          setSelectedItemForEdit(null);
          setShowAddEditModal(true);
        }}
      >
        Add New Blog
      </button>

      <div className="text-center  text-black">
        <div className="flex justify-center  items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-1/3 border-gray-300 rounded-lg bg-gray-200 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-700"
            placeholder="Search blogs..."
          />
          <button
            className="bg-pink-700 px-6 py-2 text-white font-medium rounded-lg hover:bg-pink-800 transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row py-12 px-4 gap-6">
        {/* Sidebar for Categories */}
        <div className="min-h-80 bg-gray-100 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Categories
          </h2>
          {Array.from(
            new Set(myblogdatasState.map((item) => item.blogCategory))
          ).map((category, index) => (
            <div
              key={index}
              className={`cursor-pointer p-3 rounded-md mb-2 text-center w-40 ${
                selectedBlogCategory === category
                  ? "bg-pink-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                minHeight: "50px", // Ensures consistent height
                display: "flex", // Aligns content
                alignItems: "center", // Centers vertically
                justifyContent: "center", // Centers horizontally
              }}
              onClick={() => {
                setSelectedBlogCategory(category);
              }}
            >
              <span className="text-base">{category}</span>
            </div>
          ))}

          {/* Show All Blogs Button */}
          <button
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleShowAllBlogs}
          >
            Show All Blogs
          </button>
        </div>

        {/* Blog Cards */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBlogsDatas.length > 0 ? (
            filteredBlogsDatas.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedItemIdx(idx);
                  setEditAndDeleteShow(true);
                }}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
              >
                {/* Blog Image */}
                <div className="relative h-40">
                  <img
                    className="w-full h-full object-cover"
                    src={item.blogImageUrl}
                    alt={item.blogTitleName}
                  />
                </div>

                {/* Blog Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.blogTitleName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {item.blogDescription}
                  </p>
                </div>

                {/* Read More Button */}
                <div className="bg-pink-900 text-center py-2">
                  <Link
                    to={`/blog/${item.blogCategory}/${item.read_more_route}`}
                    className="text-white font-medium hover:underline"
                  >
                    Read More
                  </Link>
                </div>

                <div className="bg-gray-300 text-center w-full py-2 my-2  ">
                  {"Click Here To Update or Delete"}

                  {editAndDeleteShow && selectItemIdx === idx && (
                    <div className="  ">
                      <button
                        className="px-2  m-1 bg-blue-500 rounded-md hover:bg-blue-900"
                        onClick={() => {
                          setSelectedItemForEdit(item);
                          setShowAddEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2  bg-red-600 rounded-md hover:bg-red-900"
                        onClick={() => onDelete(item._id)}
                      >
                        <h1>{item._id}</h1>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">
              No blogs match your search criteria.
            </div>
          )}
        </div>
      </div>

      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Blog" : "Add New Blog"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
        width={1000}
      >
        <Form
          form={form}
          initialValues={selectedItemForEdit}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="blogCategory"
            label="Blog Category"
            rules={[{ required: true, message: "Please enter a category" }]}
          >
            <Input placeholder="Enter blog category" />
          </Form.Item>

          <Form.Item
            name="blogImageUrl"
            label="Blog Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input placeholder="Enter blog image URL" />
          </Form.Item>

          <Form.Item
            name="blogTitleName"
            label="Blog Title"
            rules={[{ required: true, message: "Please enter blog title" }]}
          >
            <Input placeholder="Enter blog title" />
          </Form.Item>

          <Form.Item
            name="read_more_route"
            label="Read More Route"
            rules={[{ required: true, message: "Please enter the route" }]}
          >
            <Input placeholder="Enter " />
          </Form.Item>
          <Form.Item
            name="Contributer_Name"
            label="Contributer Name"
            rules={[
              { required: true, message: "Please enter the Contributer Name" },
            ]}
          >
            <Input placeholder="Enter Contributer Name " />
          </Form.Item>
          <Form.Item
            name="posted_Date"
            label="posted Date"
            rules={[{ required: true, message: "Please enter posted Date " }]}
          >
            <Input placeholder="Enter posted_Date " />
          </Form.Item>

          <Form.Item
            name="blogDescription"
            label="Blog Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea placeholder="Enter blog description" rows={4} />
          </Form.Item>

          <Form.Item
            name="blogContent"
            label="Blog Content"
            rules={[{ required: true, message: "Please enter blog content" }]}
          >
            <JoditEditor
              value={blogContent}
              onChange={(newContent) => setContent(newContent)}
              className="h-40"
            />
          </Form.Item>

          <div className="flex justify-center">
            <button
              className="bg-red-400 px-3 py-1 m-4 rounded-md hover:bg-red-600"
              onClick={handleCancel}
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

export default AdminBlogComponentPage;
