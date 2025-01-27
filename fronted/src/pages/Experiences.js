import React, { useState } from "react";

function Experiences({ myexperiences }) {
  const [selectItemIdx, setSelectedItemIdx] = useState(0);

  return (
    <div className="w-full">
      <div className="bg-red-1 flex flex-col sm:flex-row gap-2 sm:w-full">
        {/* Left Section - Experience List */}
        <div className="bg-white flex-col p-3 overflow-y-scroll sm:w-1/3 sm:h-auto h-64">
          {myexperiences.map((exp, currIdx) => (
            <div
              key={currIdx}
              className="cursor-pointer border-l-4 border-custom-blue"
              onClick={() => {
                setSelectedItemIdx(currIdx);
              }}
            >
              <h1
                className={`text-xl text-gray-800 p-2 rounded-lg   
                ${
                  selectItemIdx === currIdx
                    ? "text-white bg-custom-blue border-2 my-2 border-custom-blue shadow-md"
                    : "text-black"
                }`}
              >
                {exp.myExperiencePeriod}
              </h1>
            </div>
          ))}
        </div>

        {/* Right Section - Experience Content */}
        <div className="flex flex-col sm:w-2/3 sm:pl-5 gap-4 p-6 rounded-lg shadow-lg">
          {/* Fixed height for the title */}
          <h1 className="font-semibold text-2xl text-transparent bg-clip-text bg-custom-blue">
            {myexperiences[selectItemIdx].myExperienceTitle}__
          </h1>

          {/* Fixed height for the company name */}
          <h1 className="text-xl text-gray-900 font-semibold">
            {myexperiences[selectItemIdx].myExperienceCompany}
          </h1>

          {/* Dynamic height for the description with min-height */}
          <p className="text-gray-800 text-sm sm:text-md font-serif pr-4 min-h-[200px]">
            {myexperiences[selectItemIdx].myExperienceDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
