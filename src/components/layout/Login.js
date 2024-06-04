import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export const shortenAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-5, -1);
};

const shortenMail = (mail) => {
  return mail.slice(0, 3) + "..." + mail.slice(-5);
};

const Login = () => {
  const { userLoggedIn, currentUser, doSignOut } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const [isAdmin,setIsAdmin] = useState(false);
  // const {data:account} = useAccount();
  // const {data:signer} = useSigner();

  const handleLogout = async () => {
    try {
      await doSignOut();
      setDropdownVisible(false); // Close dropdown after logout
    } catch (e) {
      alert("Failed to log out");
    }
  };

  return (
    <div className="relative">
      {userLoggedIn ? (
        <button
          className="primary-btn"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          {shortenMail(currentUser.email)}
        </button>
      ) : (
        <Link to="/login">
          <button className="primary-btn">Log In</button>
        </Link>
      )}
      {dropdownVisible && userLoggedIn && (
        <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48">
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
