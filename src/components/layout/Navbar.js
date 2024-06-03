import React, { useState } from "react";
import { Link } from "react-router-dom";
import AvailabilityDropdown from "./AvailabilityDropdown";
import AwareDropdown from "./AwareDropdown";
import ConnectWallet from "./ConnectWallet.js";
import Doctors from "./Doctors.js";
import Hospitals from "./Hospitals.js";
import Login from "./Login.js";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="z-50 px-6 py-4 bg-white shadow-md">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <div className="md:flex items-center justify-between hidden w-full md:w-auto">
          <div className="md:flex items-center justify-between">
            <Hospitals />
            <Doctors />
            <AvailabilityDropdown />
            <AwareDropdown />
          </div>
          <Login />
          <ConnectWallet />
          {/* add check for admin based visibility of connect wallet button */}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } absolute top-16 left-0 w-full bg-white shadow-md md:relative md:top-0 md:left-0 md:w-auto md:flex flex-col md:flex-row items-center gap-4 p-4 md:p-0`}
          >
            <Hospitals />
            <Doctors />
            <AvailabilityDropdown />
            <AwareDropdown />
            <Login />
            <ConnectWallet />
            {/* add check for admin based visibility of connect wallet button */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
