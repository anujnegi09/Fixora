import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiBell,
  FiMessageSquare,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import ProjectLogo from "../assets/Logo.png";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { authUser, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={ProjectLogo}
            alt="Fixora Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-2xl font-bold text-blue-600">
            Fixora
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {!authUser ? (
            <>
              <Link to="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Get Started
              </Link>
            </>
          ) : (
            <>
              {/* Create Service */}
              <Link
                to="/create-service"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create Service
              </Link>

              {/* Chat */}
              <Link
                to="/chat"
                className="text-gray-700 hover:text-blue-600"
              >
                <FiMessageSquare size={22} />
              </Link>

              {/* Notification */}
              <Link
                to="/notifications"
                className="relative text-gray-700 hover:text-blue-600"
              >
                <FiBell size={22} />

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenu(!profileMenu)}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <FiUser />
                  </div>
                </button>

                {profileMenu && (
                  <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg border rounded-xl overflow-hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/my-services"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Services
                    </Link>

                    <Link
                      to="/my-bookings"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Bookings
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-2"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
            <FiX size={28} />
          ) : (
            <FiMenu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {!authUser ? (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMobileMenu(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/create-service"
                onClick={() => setMobileMenu(false)}
              >
                Create Service
              </Link>

              <Link
                to="/profile"
                onClick={() => setMobileMenu(false)}
              >
                Profile
              </Link>

              <Link
                to="/my-services"
                onClick={() => setMobileMenu(false)}
              >
                My Services
              </Link>

              <Link
                to="/my-bookings"
                onClick={() => setMobileMenu(false)}
              >
                My Bookings
              </Link>

              <button
                onClick={logout}
                className="text-left text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;