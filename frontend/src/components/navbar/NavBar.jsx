import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle,
  FaUser,
  FaCalendarAlt,
  FaTools,
  FaCrown,
  FaCog,
  FaSignOutAlt,
  FaCreditCard,
  FaQuestionCircle,
  FaPhoneAlt,
} from "react-icons/fa";

import {
  selectIsAuthenticated,
  selectUser,
} from "../../features/auth/authSelectors.js";

import { logout } from "../../features/auth/authThunks.js";
import fixoraLogo from "../../assets/fixora-logo.png";

const Navbar = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout()).unwrap();
    setIsSidebarOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="w-full px-8 h-16 flex items-center justify-between">
          {/* Logo */}

          <div className="flex items-center gap-2">
            <NavLink to="/" className="text-2xl font-bold text-blue-600">
              <img
                src={fixoraLogo}
                alt="Fixora Logo"
                className="h-24 pt-2 w-auto object-contain"
              />
            </NavLink>
          </div>

          {/* Navigation */}

          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              About
            </NavLink>
          </div>

          {/* Right Section */}

          <div className="flex items-center gap-4">
            {/* Notification */}

            <button className="text-gray-700 hover:text-blue-600">
              <FaBell size={22} />
            </button>

            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="flex items-center justify-center shrink-0"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="profile"
                    className="
        w-10
        h-10
        shrink-0
        rounded-full
        object-cover
        overflow-hidden
        border
        border-gray-200
      "
                  />
                ) : (
                  <div
                    className="
        w-10
        h-10
        shrink-0
        rounded-full
        bg-gray-200
        flex
        items-center
        justify-center
        border
        border-gray-200
      "
                  >
                    <FaUserCircle size={22} className="text-gray-700" />
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ================= OVERLAY ================= */}

      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/20 transition-opacity"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      {isSidebarOpen && (
        <aside className="fixed top-20 right-4 z-50 w-72 max-w-[90%] rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden">
          {/* ================= PROFILE ================= */}

          <div className="flex items-center gap-3 px-5 py-5">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover border"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUserCircle size={30} className="text-gray-700" />
              </div>
            )}

            <div className="flex flex-col overflow-hidden">
              <h3 className="font-semibold text-gray-900 text-base truncate">
                {user?.fullName}
              </h3>

              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ================= MENU ================= */}

          <div className="py-2">
            <NavLink
              to="/profile"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaUser size={17} />
              <span>Profile</span>
            </NavLink>

            <NavLink
              to="/account"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaUser size={17} />
              <span>Account</span>
            </NavLink>

            <NavLink
              to="/my-bookings"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaCalendarAlt size={17} />
              <span>My Bookings</span>
            </NavLink>

            <NavLink
              to="/my-services"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaTools size={17} />
              <span>My Services</span>
            </NavLink>

            <NavLink
              to="/become-provider"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaCrown size={17} />
              <span>Become a Provider</span>
            </NavLink>

            <NavLink
              to="/subscription"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaCreditCard size={17} />
              <span>Subscription</span>
            </NavLink>
          </div>

          <hr className="border-gray-200" />

          <div className="py-2">
            <NavLink
              to="/settings"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaCog size={17} />
              <span>Settings</span>
            </NavLink>

            <NavLink
              to="/help"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaQuestionCircle size={17} />
              <span>Help & Support</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaPhoneAlt size={17} />
              <span>Contact</span>
            </NavLink>
          </div>

          <hr className="border-gray-200" />

          <div className="py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-2.5 text-red-600 hover:bg-red-50 transition"
            >
              <FaSignOutAlt size={17} />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default Navbar;
