import React from "react";
import { aboutResource } from "../resources/aboutData";

function Annoucemnet() {
  return (
    <div className=" bg-white">
      <div className="text-center h-home text-blue-600 font-semibold  ">
        <h1 className="text-5xl text-top mt-12">
          Gear Up for <span className="text-red-700">Success:</span> Your
          Ultimate Preparation Hub!
        </h1>

        <div className="">
          <p className="text-black text-sm my-6">
            Navigate Your Learning Adventure: Explore DSA, Master CS Concepts,
            Design Systems, Hone Competitive Skills, and Ace Interviews
            Effortlessly
          </p>

          <div className="text-black  grid grid-cols-3 gap-4 mx-64 my-12">
            {aboutResource.map((about, idx) => (
              <div
                key={idx}
                className="p-4 font-semibold text-left rounded-md border shadow-lg  hover:border hover:border-red-400"
              >
                <img className="h-16 w-16" src={about.aboutImageUrl} alt="" />
                <h1 className=" ">DSA</h1>

                <h1 className="my-1 text-sm text-slate-400 ">
                  Descripton Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.{" "}
                </h1>

                <button className="text-left  text-slate-600 border-slate-600 border-1 border my-2 px-4 py-1  hover:bg-red-200 hover:border hover:border-red-400">
                  Try it free{" "}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center h-home text-blue-600 font-semibold ">
        <h1>EXCITING NEWS!!</h1>

        <div className="flex text-4xl  justify-center items-center">
          <h1 className="px-12 text-3xl">Exclusive Access Arrives</h1>
        </div>
        <div className="flex text-4xl  justify-center items-center"></div>
      </div>
    </div>
  );
}

export default Annoucemnet;
