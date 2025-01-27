import React,{useState} from 'react'
import { navbarData } from './../resourse/navbarData';
import {useNavigate  } from 'react-router-dom';

function Navbar() {
     const navigate=useNavigate()
 
    const [selectItemIdx, setSelectedItemIdx] = useState(0);

  return (
    <div className="sticky top-0 sm:text-left shadow-lg shadow-pink-950  ">
    <div className="sm:flex  h-auto  bg-pink-900 sm:h-16">
      <div className="sm:items-center sm:flex sm:justify-start pl-16 sm:w-2/5">
        <h1 className="sm:text-3xl text-white text-xl cursor-pointer"><a href="/">zebraKat</a></h1>
      </div>
      <div className="sm:text-xl text-sm h-auto bg-pink-900 text-white  sm:items-center sm:justify-around sm:w-3/5 sm:flex  pl-2 sm:pl-0 ">
        <h1>Enjoy Coding</h1>
      </div>
    </div>
  </div>
  )
}

export default Navbar