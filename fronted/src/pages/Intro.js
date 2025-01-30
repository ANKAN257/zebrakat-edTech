import React from "react";
import { useNavigate } from "react-router-dom";

function Intro({ introhomes }) {
  console.log("introhomes prop:", introhomes[0]); // Debug log

  const navigate = useNavigate();

  // Check if introhomes is an array, if not, fall back to an empty array
  const headers = Array.isArray(introhomes) ? introhomes : [];

  if (!headers.length) {
    console.log("No headers to display.");
  }

  return (
    <div className="flex flex-col items-center sm:mt-0">
      <div className="flex flex-col sm:flex-row h-auto sm:h-screen w-full justify-center items-center py-10 sm:py-0">
        {/* Text Section */}
        <div className="sm:w-2/4 w-full flex flex-col justify-center items-center text-center sm:text-left px-6 sm:px-10">
          <p className="text-transparent bg-clip-text bg-custom-blue text-lg sm:text-3xl break-words">
            {introhomes[0]?.welcomeText }
          </p>
          <p className="text-transparent bg-clip-text bg-custom-blue text-4xl sm:text-5xl sm:pt-4 font-semibold">
            {introhomes[0]?.firstName } {introhomes[0]?.lastName }
          </p>
          <hr className="my-4 w-16 mx-auto sm:mx-0 border-t-2 border-pink-900" />
          <p className="text-black text-sm sm:text-md font-bold sm:py-7">
            {introhomes[0]?.description }
          </p>
          <button
            className="border-2 border-pink-900 text-pink-900 hover:bg-pink-900 hover:text-white py-3 px-10 mt-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Resume
          </button>
        </div>

        {/* Image Section */}
        <div className="h-auto w-full sm:w-2/6 flex justify-center items-center mt-8 sm:mt-0 p-2 sm:p-10">
          <div className="h-64 w-64 sm:h-80 sm:w-80 p-1 rounded-full shadow-2xl shadow-custom-blue transform transition-transform duration-500 hover:scale-110">
            <img
              src="/picturesunset.jpg"
              alt="Intro Image"
              className="h-full w-full rounded-full opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
