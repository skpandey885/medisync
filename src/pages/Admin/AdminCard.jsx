import React, { useState } from "react";

const AdminCard = ({ imageSrc, title, description, buttonText, onClick }) => {
  const [adminAddress, setAdminAddress] = useState(""); // State to store the admin address
  const [isAddingAdmin, setIsAddingAdmin] = useState(false); // State to track if admin adding is active

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <img
        className="rounded-t-lg h-64 w-full object-cover"
        src={imageSrc}
        alt=""
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 text-gray-700">{description}</p>
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={() => setIsAddingAdmin(true)} // Set isAddingAdmin to true on click
        >
          {buttonText}
          <svg
            className="w-4 h-4 ms-2 transform rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
        {/* Render admin input textbox conditionally with CSS transition */}
        {isAddingAdmin && (
          <div className="mt-4 transition-opacity duration-500 opacity-100">
            <input
              type="text"
              value={adminAddress}
              onChange={(e) => setAdminAddress(e.target.value)}
              placeholder="Enter admin address"
              className="border border-gray-300 rounded-lg px-3 py-2 mt-2"
            />
            <button
              onClick={() => {
                onClick(adminAddress);
                setIsAddingAdmin(false); // Reset isAddingAdmin after adding admin
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCard;
