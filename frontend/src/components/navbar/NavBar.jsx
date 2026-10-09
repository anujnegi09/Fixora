// import { useState, useEffect, useLayoutEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import gsap from "gsap";

// import {
//   FaBars,
//   FaTimes,
//   FaBell,
//   FaUserCircle,
//   FaUser,
//   FaCalendarAlt,
//   FaTools,
//   FaCrown,
//   FaCog,
//   FaSignOutAlt,
//   FaCreditCard,
//   FaQuestionCircle,
//   FaPhoneAlt,
//   FaStar,
// } from "react-icons/fa";

// import {
//   selectIsAuthenticated,
//   selectUser,
// } from "../../features/auth/authSelectors.js";

// import { logout } from "../../features/auth/authThunks.js";
// import {
//   getNotifications,
//   getNewNotificationCount,
// } from "../../features/notifications/notificationThunks";

// import { selectNewNotificationCount } from "../../features/notifications/notificationSelectors";
// import fixoraLogo from "../../assets/fixora-logo.png";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isNotificationsPage = location.pathname === "/notifications";

//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const user = useSelector(selectUser);
//   const newNotificationCount = useSelector(selectNewNotificationCount);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     if (isAuthenticated) {
//       dispatch(getNotifications());
//       dispatch(getNewNotificationCount());
//     }
//   }, [isAuthenticated, dispatch]);

//   const handleLogout = () => {
//     dispatch(logout()).unwrap();
//     setIsSidebarOpen(false);
//   };

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   const handleNotificationNavigation = () => {
//     navigate("/notifications");
//   };

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // Logo
//       gsap.from(".navbar-logo", {
//         x: -50,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out",
//       });

//       // Navigation
//       gsap.from(".navbar-nav", {
//         y: -20,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out",
//       });

//       gsap.from(".navbar-button", {
//         y: -20,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out",
//       });
//     });

//     return () => ctx.revert();
//   }, [location.pathname]);
//   return (
//     <>
//       {/* ================= NAVBAR ================= */}

//       <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/50 bg-white/70 backdrop-blur-xl shadow-sm">
//         <div className="w-full px-8 h-16 flex items-center justify-between">
//           {/* Logo */}

//           <div className="flex items-center gap-2">
//             <NavLink
//               to="/"
//               className="navbar-logo text-2xl font-bold text-blue-600"
//             >
//               <img
//                 src={fixoraLogo}
//                 alt="Fixora Logo"
//                 className="h-22 px-2  w-auto object-contain"
//               />
//             </NavLink>
//           </div>

//           {/* Navigation */}

//           <div className="navbar-nav flex items-center gap-8">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `rounded-lg px-3 py-2 font-medium transition-all duration-200 ${
//                   isActive
//                     ? "font-semibold text-blue-600"
//                     : "text-slate-600 transition-colors duration-200 hover:text-blue-600"
//                 }`
//               }
//             >
//               Home
//             </NavLink>

//             <NavLink
//               to="/services"
//               className={({ isActive }) =>
//                 ` rounded-lg px-3 py-2 font-medium transition-all duration-200 ${
//                   isActive
//                     ? "font-semibold text-blue-600"
//                     : "text-slate-600 transition-colors duration-200 hover:text-blue-600"
//                 }`
//               }
//             >
//               Services
//             </NavLink>

//             <NavLink
//               to="/become-provider"
//               className={({ isActive }) =>
//                 ` rounded-lg px-3 py-2 font-medium transition-all duration-200 ${
//                   isActive
//                     ? "font-semibold text-blue-600"
//                     : "text-slate-600 transition-colors duration-200 hover:text-blue-600"
//                 }`
//               }
//             >
//               become a provider
//             </NavLink>
//           </div>

//           {/* Right Section */}

//           <div className="navbar-button flex items-center gap-4">
//             {/* Notification */}

//             {isAuthenticated && (
//               <button
//                 type="button"
//                 onClick={handleNotificationNavigation}
//                 className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
//                   isNotificationsPage
//                     ? " text-blue-600"
//                     : "text-slate-600 hover:text-blue-600 "
//                 }`}
//                 title="Notifications"
//               >
//                 <FaBell
//                   size={22}
//                   className={`transition-transform duration-200 ${
//                     isNotificationsPage ? "rotate-[15deg]" : "rotate-0"
//                   }`}
//                 />

//                 {newNotificationCount > 0 && (
//                   <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
//                     {newNotificationCount > 99 ? "99+" : newNotificationCount}
//                   </span>
//                 )}
//               </button>
//             )}

//             {!isAuthenticated ? (
//               <>
//                 <NavLink
//                   to="/login"
//                   className=" rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
//                 >
//                   Login
//                 </NavLink>

//                 <NavLink
//                   to="/register"
//                   className=" rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
//                 >
//                   Signup
//                 </NavLink>
//               </>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => setIsSidebarOpen((prev) => !prev)}
//                 className="flex items-center justify-center shrink-0"
//               >
//                 {user?.avatar ? (
//                   <img
//                     src={user.avatar}
//                     alt="profile"
//                     className="
//         w-10
//         h-10
//         shrink-0
//         rounded-full
//         object-cover
//         overflow-hidden
//         border
//         border-gray-200
//       "
//                   />
//                 ) : (
//                   <div className="w-10 h-10 shrink-0 rounded-full bg-gray-200 flex items-center justify-center border border-gray-50 shadow-sm ring-1 ring-slate-200">
//                     <FaUserCircle size={22} className="text-gray-700" />
//                   </div>
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* ================= OVERLAY ================= */}

//       {isSidebarOpen && (
//         <div
//           onClick={closeSidebar}
//           className="fixed inset-0 z-40 bg-black/20 transition-opacity"
//         />
//       )}

//       {/* ================= SIDEBAR ================= */}

//       {isSidebarOpen && (
//         <aside className="fixed right-4 top-[80px] z-50 w-80 max-w-[90%] overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-2xl backdrop-blur-xl">
//           {" "}
//           {/* ================= PROFILE ================= */}
//           <div className="flex items-center gap-3 px-5 py-5">
//             {user?.avatar ? (
//               <img
//                 src={user.avatar}
//                 alt="profile"
//                 className="w-14 h-14 rounded-full object-cover border"
//               />
//             ) : (
//               <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
//                 <FaUserCircle size={30} className="text-gray-700" />
//               </div>
//             )}

//             <div className="flex flex-col overflow-hidden">
//               <h3 className="font-semibold text-gray-900 text-base truncate">
//                 {user?.fullName}
//               </h3>

//               <p className="text-sm text-gray-500 truncate">{user?.email}</p>
//             </div>
//           </div>
//           <hr className="border-gray-200" />
//           {/* ================= MENU ================= */}
//           <div className="py-2">
//             <NavLink
//               to="/profile"
//               onClick={closeSidebar}
//               className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
//             >
//               <FaUser size={17} />
//               <span>Profile</span>
//             </NavLink>

//             <NavLink
//               to="/reviews"
//               onClick={closeSidebar}
//               className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
//             >
//               <FaStar size={17} />
//               <span>my reviews</span>
//             </NavLink>

//             <NavLink
//               to="/bookings"
//               onClick={closeSidebar}
//               className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
//             >
//               <FaCalendarAlt size={17} />
//               <span>My Bookings</span>
//             </NavLink>

//             <NavLink
//               to="/become-provider"
//               onClick={closeSidebar}
//               className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
//             >
//               <FaTools size={17} />
//               <span>My Services</span>
//             </NavLink>

//             <NavLink
//               to="/subscription"
//               onClick={closeSidebar}
//               className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
//             >
//               <FaCreditCard size={17} />
//               <span>Subscription</span>
//             </NavLink>
//           </div>
//           <hr className="border-gray-200" />
//           <div className="py-2">
//             <NavLink
//               to="/about"
//               onClick={closeSidebar}
//               className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
//             >
//               <FaQuestionCircle size={17} />
//               <span>About</span>
//             </NavLink>

//             <NavLink
//               to="/contact"
//               onClick={closeSidebar}
//               className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
//             >
//               <FaPhoneAlt size={17} />
//               <span>Contact</span>
//             </NavLink>
//           </div>
//           <hr className="border-gray-300" />
//           <div className="py-2">
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center gap-3 px-5 py-2.5 text-red-600 mx-2 rounded-xl hover:bg-red-50 transition"
//             >
//               <FaSignOutAlt size={17} />
//               <span>Logout</span>
//             </button>
//           </div>
//         </aside>
//       )}
//     </>
//   );
// };

// export default Navbar;


import { useState, useEffect, useLayoutEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

import {
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle,
  FaUser,
  FaCalendarAlt,
  FaTools,
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

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/become-provider", label: "Become a Provider" },
];

const desktopLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 font-medium transition-all duration-200 ${
    isActive
      ? "font-semibold text-blue-600"
      : "text-slate-600 hover:text-blue-600"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
    isActive
      ? "bg-blue-50 font-semibold text-blue-600"
      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
  }`;

const menuItemClass =
  "flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isNotificationsPage = location.pathname === "/notifications";

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const newNotificationCount = useSelector(selectNewNotificationCount);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNotificationNavigation = () => {
    setIsMobileMenuOpen(false);
    setIsSidebarOpen(false);
    navigate("/notifications");
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Logo
      gsap.from(".navbar-logo", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Navigation
      gsap.from(".navbar-nav", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".navbar-button", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/50 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              onClick={() => {
                closeMobileMenu();
                closeSidebar();
              }}
              className="navbar-logo text-2xl font-bold text-blue-600"
            >
              <img
                src={fixoraLogo}
                alt="Fixora Logo"
                className="h-14 md:h-22 w-auto object-contain px-1 md:px-2"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation (hidden on mobile) */}
          <div className="navbar-nav hidden md:flex items-center gap-2 lg:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={desktopLinkClass}
              >
                <span className="capitalize">{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="navbar-button flex items-center gap-2 sm:gap-4">
            {/* Notification */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleNotificationNavigation}
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                  isNotificationsPage
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
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

            {/* Login / Signup (desktop only; mobile gets them in the menu) */}
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
                >
                  Signup
                </NavLink>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsSidebarOpen((prev) => !prev);
                  setIsMobileMenuOpen(false);
                }}
                className="flex shrink-0 items-center justify-center"
                aria-label="Open profile menu"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="profile"
                    className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-gray-50 bg-gray-200 shadow-sm ring-1 ring-slate-200">
                    <FaUserCircle size={22} className="text-gray-700" />
                  </div>
                )}
              </button>
            )}

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev);
                setIsSidebarOpen(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 transition hover:bg-slate-100 md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= OVERLAY ================= */}

      {(isSidebarOpen || isMobileMenuOpen) && (
        <div
          onClick={() => {
            closeSidebar();
            closeMobileMenu();
          }}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity"
        />
      )}

      {/* ================= MOBILE MENU ================= */}

      {isMobileMenuOpen && (
        <div className="fixed inset-x-3 top-[72px] z-50 max-h-[calc(100vh-90px)] overflow-y-auto rounded-2xl border border-white/60 bg-white/95 p-3 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {!isAuthenticated && (
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3">
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMobileMenu}
                className="block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Signup
              </NavLink>
            </div>
          )}
        </div>
      )}

      {/* ================= PROFILE SIDEBAR ================= */}

      {isSidebarOpen && (
        <aside className="fixed inset-x-3 top-[72px] z-50 max-h-[calc(100vh-90px)] overflow-y-auto rounded-2xl border border-white/60 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-4 sm:w-80">
          {/* ================= PROFILE ================= */}
          <div className="flex items-center gap-3 px-5 py-5">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="profile"
                className="h-14 w-14 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
                <FaUserCircle size={30} className="text-gray-700" />
              </div>
            )}

            <div className="flex flex-col overflow-hidden">
              <h3 className="truncate text-base font-semibold text-gray-900">
                {user?.fullName}
              </h3>
              <p className="truncate text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ================= MENU ================= */}
          <div className="py-2">
            <NavLink to="/profile" onClick={closeSidebar} className={menuItemClass}>
              <FaUser size={17} />
              <span>Profile</span>
            </NavLink>

            <NavLink to="/reviews" onClick={closeSidebar} className={menuItemClass}>
              <FaStar size={17} />
              <span>My Reviews</span>
            </NavLink>

            <NavLink to="/bookings" onClick={closeSidebar} className={menuItemClass}>
              <FaCalendarAlt size={17} />
              <span>My Bookings</span>
            </NavLink>

            <NavLink
              to="/become-provider"
              onClick={closeSidebar}
              className={menuItemClass}
            >
              <FaTools size={17} />
              <span>My Services</span>
            </NavLink>

            <NavLink
              to="/subscription"
              onClick={closeSidebar}
              className={menuItemClass}
            >
              <FaCreditCard size={17} />
              <span>Subscription</span>
            </NavLink>
          </div>

          <hr className="border-gray-200" />

          <div className="py-2">
            <NavLink to="/about" onClick={closeSidebar} className={menuItemClass}>
              <FaQuestionCircle size={17} />
              <span>About</span>
            </NavLink>

            <NavLink to="/contact" onClick={closeSidebar} className={menuItemClass}>
              <FaPhoneAlt size={17} />
              <span>Contact</span>
            </NavLink>
          </div>

          <hr className="border-gray-300" />

          <div className="p-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-5 py-2.5 text-red-600 transition hover:bg-red-50"
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
