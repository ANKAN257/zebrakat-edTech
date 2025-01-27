import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BlogPageComponent({ myblogdatas }) {
  const [selectedBlogCategory, setSelectedBlogCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectItemIdx, setSelectedItemIdx] = useState(0);
  const navigate = useNavigate();

  // Ensure myblogdatas array exists and is not empty
  if (!myblogdatas || myblogdatas.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">No blogs available</div>
    );
  }

  // Ensure selectItemIdx is within bounds
  if (selectItemIdx < 0 || selectItemIdx >= myblogdatas.length) {
    setSelectedItemIdx(0); // Set to default if out of bounds
  }

  // Filter blogs based on search and category
  const filteredBlogsDatas = myblogdatas.filter((blog) => {
    const matchesCategory =
      !selectedBlogCategory || blog.blogCategory === selectedBlogCategory;
    const matchesSearchQuery =
      !searchQuery ||
      blog.blogTitleName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  const handleShowAllBlogs = () => {
    setSelectedBlogCategory(null);
    setSearchQuery("");
  };

  const handleNavigate = () => {
    navigate("/dsa-problems");
  };

  const handleSearch = () => {
    // You can add any custom behavior for search action here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <nav className="bg-pink-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">
            <a href="/blog">Blogs</a>
          </h1>
          <div className="space-x-4">
            <a href="/">
              <button className="bg-pink-700 hover:bg-pink-600 py-2 px-6 rounded-md transition-all">
                Home
              </button>
            </a>
            <a href="/dsa-problems">
              <button className="bg-pink-700 hover:bg-pink-600 py-2 px-6 rounded-md transition-all">
                DSA problems
              </button>
            </a>
          </div>
        </div>
      </nav>
      <div className="text-center py-8 bg-pink-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Explore Blogs</h1>
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-1/3 border-gray-300 rounded-lg bg-white text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-700"
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
        <div className="min-h-80 bg-green-400 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Categories
          </h2>
          {Array.from(
            new Set(myblogdatas.map((item) => item.blogCategory))
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
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">
              No blogs match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogPageComponent;
