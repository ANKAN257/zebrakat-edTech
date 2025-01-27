import React from "react";

function SectionTitle({ abouts, titleText }) {
  return (
    <div className="h-screen w-full  flex-col flex justify-center items-center">
      {/* Title Section */}
      <div className="text-center text-black  ">
        <h1 className="text-3xl font-extrabold  sm:text-4xl text-transparent bg-clip-text bg-custom-blue">
          {titleText}
        </h1>

      </div>

      <div className=" w-full sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-12">
        {abouts.map((about, idx) => (
          <div
            key={idx}
            className="bg-custom-blue text-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <img
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-md mx-auto mb-4 sm:mb-6 border-4 border-white"
              src={about.aboutImageUrl}
              alt={about.aboutTitle}
            />
            <h2 className="text-lg sm:text-xl font-semibold text-center text-white mb-3">
              {about.aboutTitle}
            </h2>
            <p className="text-center text-xs sm:text-sm text-gray-200 mb-4 font-semibold">
              {about.aboutDescription}
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-left text-white mb-2">
              {about.aboutTodo}
            </h3>
            <ul className="pl-4 text-left text-gray-200 text-xs sm:text-sm space-y-1">
              {about.aboutListTodos.map((item, index) => (
                <li key={index} className="font-semibold">
                  {item.todo}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

     


    </div>
  );
}

export default SectionTitle;
