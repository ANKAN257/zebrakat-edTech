import React from 'react'
import { Link } from 'react-router-dom'

function MainNavbar() {
  return (
    <div className="sticky top-0 sm:text-left shadow-lg shadow-pink-950  ">
      <div class="sm:flex  h-auto  bg-pink-900 sm:h-16">
        <div class="sm:items-center sm:flex sm:justify-start pl-16 sm:w-2/5">
         <a href="/"> <h1 className="sm:text-3xl text-white text-xl">MyBlog</h1></a>
        </div>
        <div className="sm:text-xl text-sm h-auto bg-pink-900 text-white  sm:items-center sm:justify-around sm:w-3/5 sm:flex  pl-2 sm:pl-0 ">
            
        </div>
      </div>
    </div>
  )
}

export default MainNavbar