import React from "react";
import Experiences from "./../pages/Experiences";

function Skillset({ myskills, myexperiences }) {
  return (
    <div className="h-screen w-full flex justify-center flex-col md:flex-row">
      {/* Skillset Section */}
      <div className="w-full md:w-1/3 rounded-lg shadow-xl mb-6 md:mb-0">
        <div className="grid grid-cols-5 gap-16 px-12 py-8">
          {myskills.map((skill, index) => (
            <div key={index} className="transition-all transform hover:scale-110">
              <img
                src={skill.mySkillImage}
                alt={skill.mySkillName}
                className="h-12 w-16 rounded-md shadow-md hover:shadow-xl transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Experiences Section */}
      <div className="w-full md:w-2/3 rounded-lg shadow-xl pt-4">
        <Experiences myexperiences={myexperiences} />
      </div>
    </div>
  );
}

export default Skillset;
