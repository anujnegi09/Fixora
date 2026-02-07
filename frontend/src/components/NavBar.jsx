// import React, { useContext, useState } from "react";
// import ProjectLogo from "../assets/Logo.png";
// import {Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";



// import { useLocation } from "react-router-dom";

// // import { useAuth } from "../../context/AuthContext";

// const NavBar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//     const { isLoggedIn, login, logout } = useAuth();
//   return (
//     <div>
//         <nav className="z-[100] fixed w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       {/* Logo */}
//       <div className="flex justify-center items-center ">
//         <img
//         src={ProjectLogo}
//         alt="Fixora Logo"
//         className="h-10 w-10 rounded-full pr-2 pt-2 object-contain "
//       />
//       <h1 className="text-3xl font-bold text-blue-600">Fixora</h1>
//       </div>

//       {/* Links */}
//       <div className="flex items-center gap-6">
//         <Link
//           to="/"
//           className={`cursor-pointer ${
//           location.pathname === "/"
//             ? "text-blue-600 underline underline-offset-6 decoration-3"
//             : "text-gray-700 hover:text-blue-600"
//           }`}
//         > 
//           Home
//         </Link>
//         {/* Home */}
//       <Link
//         to="/Services"
//         className={`cursor-pointer ${
//           location.pathname === "/Services"
//             ? "text-blue-600 underline underline-offset-6 decoration-3"
//             : "text-gray-700 hover:text-blue-600"
//         }`}
//       >
//         Services
//       </Link>

//       {/* About */}
//       <Link
//         to="/About"
//         className={`cursor-pointer ${
//           location.pathname === "/About"
//             ? "text-blue-600 underline underline-offset-6 decoration-3"
//             : "text-gray-700 hover:text-blue-600"
//         }`}
//       >
//         About
//       </Link>

//       {/* Create Service */}
//       <Link
//         to="/ServiceProviderPage"
//         className={`cursor-pointer ${
//           location.pathname === "/ServiceProviderPage"
//             ? "text-blue-600 underline underline-offset-6 decoration-3"
//             : "text-gray-700 hover:text-blue-600"
//         }`}
//       >
//         Create Service
//       </Link>

//         {/* Auth Buttons */}
//         {!isLoggedIn ? (
//           <button
//   onClick={() => {
    
//       navigate("/LoginPage");
    
//   }}
//   className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer ${
//     location.pathname === "/LoginPage" ? "opacity-50 pointer-events-none" : ""
//   }`}
// >
//   Signup
// </button>

//         ) : (
//           <button
//             onClick={logout}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//     </div>
//   )
// }

// export default NavBar


















// {/* <a onClick={() => {
//         if (location.pathname !== "/") {
//           navigate("/");
//         }
//       }} className={`cursor-pointer ${
//         location.pathname === "/" 
//           ? "text-blue-600 underline underline-offset-6 decoration-3" 
//           : "text-gray-700 hover:text-blue-600"
//       }`}>Home</a> */}


import React, { useContext } from "react";
import ProjectLogo from "../assets/Logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser, logout } = useContext(AuthContext); // get authUser and logout

  return (
    <div>
      <nav className="z-[100] fixed w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <img
            src={ProjectLogo}
            alt="Fixora Logo"
            className="h-10 w-10 rounded-full pr-2 pt-2 object-contain"
          />
          <h1 className="text-3xl font-bold text-blue-600">Fixora</h1>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`cursor-pointer ${
              location.pathname === "/"
                ? "text-blue-600 underline underline-offset-6 decoration-3"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <Link
            to="/Services"
            className={`cursor-pointer ${
              location.pathname === "/Services"
                ? "text-blue-600 underline underline-offset-6 decoration-3"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Services
          </Link>

          <Link
            to="/About"
            className={`cursor-pointer ${
              location.pathname === "/About"
                ? "text-blue-600 underline underline-offset-6 decoration-3"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            About
          </Link>

          <Link
            to="/ServiceProviderPage"
            className={`cursor-pointer ${
              location.pathname === "/ServiceProviderPage"
                ? "text-blue-600 underline underline-offset-6 decoration-3"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Create Service
          </Link>

          {/* Auth Buttons */}
          {!authUser ? (
            <button
              onClick={() => navigate("/LoginPage")}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
                location.pathname === "/LoginPage" ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              Signup
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
