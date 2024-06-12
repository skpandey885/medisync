// import React, { useState, useEffect } from "react";
// import { Link , useNavigate} from "react-router-dom";
// import { useAuth } from "../../contexts/authContext";
// import { FaCircleUser } from "react-icons/fa6";

// export const shortenAddress = (address) => {
//   return address.slice(0, 6) + "..." + address.slice(-5, -1);
// };

// const shortenMail = (mail) => {
//   return mail.slice(0, 3) + "..." + mail.slice(-5);
// };

// const Login = () => {
//   const [storedIsAdmin, setStoredIsAdmin] = useState(null);
//   useEffect(() => {
//     const isAdminStored = localStorage.getItem("isAdmin");
//     setStoredIsAdmin(isAdminStored === "true");
//   }, []);

//   useEffect(() => {
//     console.log(storedIsAdmin);
//   }, [storedIsAdmin])
  

//   const navigate = useNavigate();
//   const { userLoggedIn, currentUser, isAdmin, doSignOut, updateIsAdmin } =
//     useAuth();

//     console.log(isAdmin);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await doSignOut();
//       updateIsAdmin(false);
//       setDropdownVisible(false); // Close dropdown after logout
//     } catch (e) {
//       alert("Failed to log out");
//     }
//   };

//   return (
//     <div className="relative">
//       {userLoggedIn ? (
//         <button
        
//            className="mx-1 mt-2"
          
//           onMouseOver={() => setDropdownVisible(!dropdownVisible)}
      
//         >
//           <FaCircleUser  size={37} color="#3B82F6"/>
//           {/* {shortenMail(currentUser.email)} */}
//         </button>
//       ) : (
//         <Link to="/login">
//           <button className="primary-btn">Log In</button>
//         </Link>
//       )}
//       {dropdownVisible && userLoggedIn && (
//         <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg">
//           <button
//             onClick={handleLogout}
//             className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//      {
         
//          (storedIsAdmin || isAdmin) && (<button
//             onClick={()=>{navigate("/admin/dashboard")}}
//             className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
//           >
//             Admin Dashboard
//           </button>)
// }
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { FaCircleUser } from "react-icons/fa6";

export const shortenAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-5, -1);
};

const shortenMail = (mail) => {
  return mail.slice(0, 3) + "..." + mail.slice(-5);
};

const Login = () => {
  const [storedIsAdmin, setStoredIsAdmin] = useState(null);
  useEffect(() => {
    const isAdminStored = localStorage.getItem("isAdmin");
    setStoredIsAdmin(isAdminStored === "true");
  }, []);

  useEffect(() => {
    console.log(storedIsAdmin);
  }, [storedIsAdmin]);

  const navigate = useNavigate();
  const { userLoggedIn, currentUser, isAdmin, doSignOut, updateIsAdmin } =
    useAuth();

  console.log(isAdmin);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await doSignOut();
      updateIsAdmin(false);
      setDropdownVisible(false); // Close dropdown after logout
    } catch (e) {
      alert("Failed to log out");
    }
  };

  return (
    <div className="relative" onMouseLeave={() => setDropdownVisible(false)}>
      {userLoggedIn ? (
        <button
          className="mx-1 mt-2"
          onMouseOver={() => setDropdownVisible(true)}
        >
          <FaCircleUser size={37} color="#3B82F6" />
    
        </button>
      ) : (
        <Link to="/login">
          <button className="primary-btn">Log In</button>
        </Link>
      )}
      {dropdownVisible && userLoggedIn && (
        <div
          className="absolute right-0 w-48 bg-white border rounded-lg shadow-lg"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
          {(storedIsAdmin || isAdmin) && (
            <button
              onClick={() => {
                navigate("/admin/dashboard");
              }}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Admin Dashboard
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
