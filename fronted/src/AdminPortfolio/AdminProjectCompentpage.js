import React, { useState, useEffect } from "react";
import { Form, message, Space, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchPortfolioData } from "./fetchPortfolioData";

function AdminProjectCompentpage({ projects, titleText }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [selectItemIdx, setSelectedItemIdx] = useState(0);
  const [editAndDeleteShow, setEditAndDeleteShow] = useState(false);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [projectsState, setProjects] = useState(projects); // local state for abouts list
  // console.log("projectsState::---",projectsState);

  const refreshPortfolioData = async () => {
    try {
      // Call the function to re-fetch the portfolio data
      const updatedData = await fetchPortfolioData();
      // Here, we assume 'fetchPortfolioData' returns updated portfolio data
      setProjects(updatedData?.projects || []);
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
          "http://localhost:5000/api/portfolio/update-project",
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
          "http://localhost:5000/api/portfolio/add-project",
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

  const onDelete = async (projectId) => {
    try {
      console.log("Expe hai kuch ", projectId);

      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setAlertMessage("You are not authenticated. Redirecting to login...");
        setAlertType("error");
        navigate("/");
        return;
      }

      const response = await axios.delete(
        "http://localhost:5000/api/portfolio/delete-project",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Pass token in the header
          },
          data: { projectId }, // Pass the projectId in the data object for DELETE requests
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

  return (
    <div>
      <div className="">
        <h1 className="text-center text-3xl"> {titleText}</h1>

        <div className="text-left mx-4">
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

        <div className=" py-4 flex  ">
          <div className="bg-white  w-2/5 flex-col p-3     ">
            {projectsState.map((exp, currIdx) => (
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
                                          ? "text-white border-2  bg-pink-900 border-orange-900  shadow-slate-700 shadow-md "
                                          : "text-black"
                                      }`}
                >
                  {exp.projectTitle}
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
                        {/* <h1>{exp._id}</h1> */}
                        Delete
                      </button>
                    </div>
                  )}
                </h1>
              </div>
            ))}
          </div>

          <div className="w-1/2 p-4 m-2">
            {projectsState[selectItemIdx] && ( // Check if projects[selectItemIdx] is defined
              <>
                <h1 className="text-white text-center bg-pink-900 text-2xl py-4">
                  Project Images
                </h1>
                <img
                  src={projectsState[selectItemIdx].projectImageOne}
                  alt=""
                  className="p-4 border-red-400 border-2 shadow-slate-700 shadow-xl"
                />
                <img
                  src={projectsState[selectItemIdx].projectImageSecond}
                  alt=""
                  className="p-4 border-red-400 border-2 shadow-slate-700 shadow-xl"
                />
              </>
            )}
          </div>

          {projectsState[selectItemIdx] && (
            <div className="w-10/12 bg-white flex flex-col pl-8 pt-2 shadow-slate-700 shadow-inner border-l-red-400 border-2">
              <h1 className="font-semibold text-xl">
                {projectsState[selectItemIdx].projectDescription}__
              </h1>
              <a
                href={projectsState[selectItemIdx].projectLink}
                className="text-blue-600"
              >
                Website Link
              </a>
              <p className="text-xl">Description_____: </p>
              {projectsState[selectItemIdx].projectDetailsList.map(
                (item, index) => (
                  <div key={index}>
                    <li>{item.projectDList}</li>
                  </div>
                )
              )}
              <h1 className="text-xl">Tech used :__</h1>
              <div className="grid grid-cols-10 py-4 gap-5">
                {projectsState[selectItemIdx].projectTechUsedImage.map(
                  (img, index) => (
                    <div key={index}>
                      <img
                        src={img.techImageUsed}
                        alt=""
                        className="w-12 h-12"
                      />
                    </div>
                  )
                )}
              </div>
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
            <Form.Item name="projectTitle" className="text-center  ">
              <input
                placeholder="projectTitle"
                className="p-2 py-2 border-red-900 text-xl  w-full  rounded-lg border hover:bg-blue-100 hover:border-blue-900"
              />
            </Form.Item>

            <Form.Item name="projectLink" className="text-center  ">
              <input
                placeholder="projectLink"
                className="p-2 py-2 border-red-900 text-xl  w-full  rounded-lg border hover:bg-blue-100 hover:border-blue-900"
              />
            </Form.Item>
            <Form.Item name="projectImageOne" className="text-center  ">
              <input
                placeholder="projectImageOne"
                className="p-2 py-2 border-red-900 text-xl  w-full  rounded-lg border hover:bg-blue-100 hover:border-blue-900"
              />
            </Form.Item>

            <Form.Item name="projectImageSecond" className="text-center  ">
              <input
                placeholder="projectImageSecond"
                className="p-2 py-2 border-red-900 text-xl  w-full  rounded-lg border hover:bg-blue-100 hover:border-blue-900"
              />
            </Form.Item>
            <Form.Item name="projectDescription" className="text-center  ">
              <textarea
                placeholder="projectDescription"
                className="p-2 py-8 border-red-900 text-xl  w-full  rounded-lg border hover:bg-blue-100 hover:border-blue-900"
              />
            </Form.Item>

            <Form.List name="projectDetailsList">
              {(listFields, { add: addList, remove: removeList }) => (
                <>
                  {listFields.map(
                    ({ key, name, listFieldsKey, ...restlistFields }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 2 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restlistFields}
                          name={[name, "projectDList"]}
                          listFieldsKey={[listFieldsKey, "projectDList"]}
                          rules={[
                            { required: true, message: "Missing projectDList" },
                          ]}
                        >
                          <input
                            placeholder="projectDList"
                            name="projectDList"
                            className="hover:bg-blue-300 hover:border p-2 border border-red-700"
                          />
                        </Form.Item>
                        <Button
                          type="link"
                          onClick={() => removeList(name)}
                          danger
                          onMouseEnter={(e) => (e.target.style.color = "blue")}
                          onMouseLeave={(e) => (e.target.style.color = "red")}
                        >
                          Remove
                        </Button>
                      </Space>
                    )
                  )}
                  <Form.Item>
                    <Button
                      type="dashed "
                      onClick={() => addList()}
                      block
                      className="bg-red-300"
                    >
                      Add projectDetailsList
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.List name="projectTechUsedImage">
              {(imageFields, { add: addImage, remove: removeImage }) => (
                <>
                  {imageFields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 2 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "techImageUsed"]}
                        fieldKey={[fieldKey, "techImageUsed"]}
                        rules={[
                          { required: true, message: "Missing techImageUsed" },
                        ]}
                      >
                        <input
                          placeholder="techImageUsed"
                          name="techImageUsed"
                          className="hover:bg-blue-300 hover:border p-2 border border-red-700"
                        />
                      </Form.Item>
                      <Button
                        type="link"
                        onClick={() => removeImage(name)}
                        danger
                        onMouseEnter={(e) => (e.target.style.color = "blue")}
                        onMouseLeave={(e) => (e.target.style.color = "red")}
                      >
                        Remove
                      </Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed "
                      onClick={() => addImage()}
                      block
                      className="bg-red-300"
                    >
                      Add TechImage
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <div className="flex justify-center ">
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
    </div>
  );
}

export default AdminProjectCompentpage;
