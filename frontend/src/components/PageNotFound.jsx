import React from "react";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center transition-all duration-300">
      <h1 className="text-6xl font-bold text-gray-800 transition-transform duration-500 hover:scale-110">
        404
      </h1>
      <p className="text-xl text-gray-600 mt-4 transition-opacity duration-500 hover:opacity-75">
        Oops! Page not found.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      > 
        Go Home
      </a>
    </div>
  );
}

export default PageNotFound;
