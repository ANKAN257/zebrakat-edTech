import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



function MainHomePage() {
 



  return (
    <div className="h-auto w-full bg-slate-400">
      <div className="flex justify-around p-4 bg-pink-950">
        <div className="flex justify-left w-4/5">
          <div className="w-1/5">
            <a href="/">
              <h1 className="text-3xl text-white">zebraKat</h1>
            </a>
          </div>


      
        </div>

       
      </div>

     
    </div>
  );
}

export default MainHomePage;
