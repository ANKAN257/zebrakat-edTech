import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BlogContentPage({ myblogdatas }) {
  console.log("myblogdatas;;;;;;;;;;", myblogdatas);

  const navigate = useNavigate();

  const { blogCategory, read_more_route } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (Array.isArray(myblogdatas)) {
      const blog = myblogdatas.find(
        (item) =>
          item.blogCategory === blogCategory &&
          item.read_more_route === read_more_route
      );

      if (blog) {
        setData(blog);
        setError(""); // Clear any previous error
      } else {
        setError("Blog not found.");
      }
    } else {
      setError("Invalid blog data.");
    }
  }, [myblogdatas, blogCategory, read_more_route]);

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold text-lg">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-20 text-gray-500 font-semibold text-lg">
        Loading blog content...
      </div>
    );
  }

  const handleNavigate = () => {
    navigate("/blog");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-pink-900 py-5">
        <button
          className="text-white text-3xl ml-12 bg-pink-700 py-2 px-6 rounded-md hover:bg-pink-600 transition-all duration-300"
          onClick={handleNavigate}
        >
          My Blog Page
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-8 flex">
        {/* Main Content Area */}
        <div className="w-2/3 bg-white shadow-lg rounded-lg overflow-hidden p-8">
          <div className="bg-pink-900 text-white py-6 px-8">
            <h1 className="text-4xl font-bold mb-4">{data?.blogTitleName}</h1>
            <div className="flex justify-between text-lg">
              <h2>Contributor: {data?.Contributer_Name}</h2>
              <h2>Posted on: {data?.posted_Date}</h2>
            </div>
          </div>

          <div className="bg-gray-100 p-8">
            <div className="prose lg:prose-xl text-gray-800">
              <div dangerouslySetInnerHTML={{ __html: data?.blogContent }} />
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-1/3 pl-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Recommendations
            </h2>
            <div className="space-y-4">
              {myblogdatas
                .filter(
                  (blog) =>
                    blog.blogCategory === data?.blogCategory &&
                    blog.read_more_route !== read_more_route // Exclude the current blog
                )
                .slice(0, 5) // Display up to 5 recommendations
                .map((blog) => (
                  <div key={blog.read_more_route}>
                    <h3 className="text-lg text-pink-600 font-semibold">
                      <a
                        href={`/blogs/${blog.blogCategory}/${blog.read_more_route}`}
                        className="hover:text-pink-800"
                      >
                        {blog.blogTitleName}
                      </a>
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogContentPage;
