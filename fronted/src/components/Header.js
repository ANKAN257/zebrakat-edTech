import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ myheaders }) {
  const navigate = useNavigate();
  const [selectItemIdx, setSelectedItemIdx] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 shadow-lg bg-custom-blue">
      <div className="flex items-center justify-between h-16 px-6 sm:px-12 bg-custom-blue">
        {/* Logo Section */}
        <div className="flex items-center">
          <h1 className="text-3xl font-extrabold text-white hover:text-teal-200 cursor-pointer transition-colors duration-300 ease-in-out">
            <a href="/">ZebraKat</a>
          </h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Section for Desktop */}
        <div className="hidden sm:flex space-x-8 items-center">
          {myheaders.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedItemIdx(index);
              }}
              className={`cursor-pointer py-2 px-4 rounded-lg transition-all duration-300 ease-in-out 
                          ${
                            selectItemIdx === index
                              ? "bg-blue-900 text-white scale-105 shadow-md"
                              : "text-white hover:bg-blue-20 hover:text-teal-200"
                          }`}
            >
              <h1 className="text-xl font-medium">
                {item.flag ? (
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/${item.myHeaderLink}`);
                    }}
                  >
                    {item.myHeaderTitle}
                  </p>
                ) : (
                  <a href={`#${item.myHeaderLink}`} className="cursor-pointer">
                    {item.myHeaderTitle}
                  </a>
                )}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-custom-blue">
          {myheaders.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedItemIdx(index);
                setIsMobileMenuOpen(false); // Close menu on click
              }}
              className={`py-2 px-6 border-b border-gray-700 text-white transition-all duration-300 
                          ${
                            selectItemIdx === index
                              ? "bg-blue-900 scale-105 shadow-md"
                              : "hover:bg-blue-700"
                          }`}
            >
              <h1 className="text-lg font-medium">
                {item.flag ? (
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/${item.myHeaderLink}`);
                    }}
                  >
                    {item.myHeaderTitle}
                  </p>
                ) : (
                  <a href={`#${item.myHeaderLink}`} className="cursor-pointer">
                    {item.myHeaderTitle}
                  </a>
                )}
              </h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;
