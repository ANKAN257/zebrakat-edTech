import React, { useState } from "react";

function ProjectCompentpage({ projects, projectTitle }) {
  const [selectItemIdx, setSelectedItemIdx] = useState(0);

  return (
    <div className="h-screen w-full   ">
      

      <h1 className="text-3xl font-extrabold pt-20  text-center sm:text-4xl text-transparent bg-clip-text bg-custom-blue">
          {projectTitle}
        </h1>
      
       
        <div className="flex-col flex justify-center   md:flex-row gap-6 justify-center pt-4  ">
        <div className="bg-white w-full md:w-2/5 flex-col p-4 ">
          {projects.map((exp, currIdx) => (
            <div
              key={currIdx}
              className="cursor-pointer  mb-4 "
              onClick={() => setSelectedItemIdx(currIdx)}
            >
              <h1
                className={`text-xl text-gray-800 p-2 rounded-lg 
                ${
                  selectItemIdx === currIdx
                    ? "text-white bg-custom-blue border-2 border-custom-blue "
                    : "text-gray-700"
                }`}
              >
                {exp.projectTitle}
              </h1>
            </div>
          ))}
        </div>

        {/* Right Panel: Project Images and Details */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-white text-center bg-custom-blue text-xl py-4 mb-4 rounded-md">
            Project Images
          </h1>
          <div className="flex flex-col gap-6">
            <img
              src={projects[selectItemIdx].projectImageOne}
              alt="Image 1"
              className="p-4 border-2 border-custom-blue  rounded-lg  "
            />
            <img
              src={projects[selectItemIdx].projectImageSecond}
              alt="Image 2"
              className="p-4 border-2 border-custom-blue  rounded-lg "
            />
          </div>
        </div>

        {/* Project Details */}
        <div className=" md:w-10/12 bg-white flex flex-col pl-8 pt-6 rounded-lg shadow-inner ">
          <h1 className="font-semibold text-xl mb-4 text-gray-800">
            {projects[selectItemIdx].projectDescription}
          </h1>
          <a
            href={projects[selectItemIdx].projectLink}
            className="text-pink-600 hover:text-pink-700 mb-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website Link
          </a>
          <p className="text-xl font-semibold mb-2 text-gray-800">
            Description:
          </p>
          <ul className="space-y-2">
            {projects[selectItemIdx].projectDetailsList.map((item, index) => (
              <li key={index} className="list-disc ml-5 text-gray-700">
                {item.projectDList}
              </li>
            ))}
          </ul>
          <h1 className="text-xl font-semibold mt-4 text-gray-800">
            Tech Used:
          </h1>
          <div className="grid grid-cols-5 md:grid-cols-10 py-4 gap-4">
            {projects[selectItemIdx].projectTechUsedImage.map((img, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={img.techImageUsed}
                  alt=""
                  className="w-12 h-12 object-cover rounded-full"
                />
              </div>
            ))}
          </div>
        </div>

             
        </div>




      </div>

 
  );
}

export default ProjectCompentpage;
