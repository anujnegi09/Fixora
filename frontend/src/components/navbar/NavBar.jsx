import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
  FaStar,
} from "react-icons/fa";

import {
  selectIsAuthenticated,
  selectUser,
} from "../../features/auth/authSelectors.js";

import { logout } from "../../features/auth/authThunks.js";
import {
  getNotifications,
  getNewNotificationCount,
} from "../../features/notifications/notificationThunks";

import { selectNewNotificationCount } from "../../features/notifications/notificationSelectors";
import fixoraLogo from "../../assets/fixora-logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isNotificationsPage = location.pathname === "/notifications";

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const newNotificationCount = useSelector(selectNewNotificationCount);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications());
      dispatch(getNewNotificationCount());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    dispatch(logout()).unwrap();
    setIsSidebarOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNotificationNavigation = () => {
    navigate("/notifications");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/50 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="w-full px-8 h-16 flex items-center justify-between">
          {/* Logo */}

          <div className="flex items-center gap-2">
            <NavLink to="/" className="text-2xl font-bold text-blue-600">
              <img
                src={fixoraLogo}
                alt="Fixora Logo"
                className="h-22 px-2  w-auto object-contain"
              />
            </NavLink>
          </div>

          {/* Navigation */}

          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 font-medium transition-all duration-200 ${
                  isActive
                    ? "font-semibold text-blue-600"
                    : "text-slate-600 transition-colors duration-200 hover:text-blue-600"
                }`
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
              to="/become-provider"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              become a provider
            </NavLink>
          </div>

          {/* Right Section */}

          <div className="flex items-center gap-4">
            {/* Notification */}

            {isAuthenticated && (
              <button
                type="button"
                onClick={handleNotificationNavigation}
                // className={`relative transition ${
                //   isNotificationsPage
                //     ? "text-blue-600"
                //     : "text-gray-700 hover:text-blue-600"
                // }`}
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                  isNotificationsPage
                    ? " text-blue-600"
                    : "text-slate-600 hover:text-blue-600 "
                }`}
                title="Notifications"
              >
                <FaBell
                  size={22}
                  className={`transition-transform duration-200 ${
                    isNotificationsPage ? "rotate-[15deg]" : "rotate-0"
                  }`}
                />

                {newNotificationCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {newNotificationCount > 99 ? "99+" : newNotificationCount}
                  </span>
                )}
              </button>
            )}

            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"                >
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
                  <div className="w-10 h-10 shrink-0 rounded-full bg-gray-200 flex items-center justify-center border border-gray-50 shadow-sm ring-1 ring-slate-200">
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
        <aside className="fixed right-4 top-[80px] z-50 w-80 max-w-[90%] overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-2xl backdrop-blur-xl">  {/* ================= PROFILE ================= */}

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
              to="/reviews"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaStar size={17} />
              <span>my reviews</span>
            </NavLink>

            <NavLink
              to="/bookings"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaCalendarAlt size={17} />
              <span>My Bookings</span>
            </NavLink>

            <NavLink
              to="/become-provider"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaTools size={17} />
              <span>My Services</span>
            </NavLink>

            {/* <NavLink
              to="/become-provider"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
            >
              <FaCrown size={17} />
              <span>Become a Provider</span>
            </NavLink> */}

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

          <hr className="border-gray-300" />

          <div className="py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-2.5 text-red-600 mx-2 rounded-xl hover:bg-red-50 transition"
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
